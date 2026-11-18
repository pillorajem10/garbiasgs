import http from "node:http";
import { config, findMissingSettings } from "./config.mjs";
import { sendInquiry } from "./mailer.mjs";
import { createRateLimiter } from "./rateLimiter.mjs";
import { isHoneypotFilled, validateInquiry } from "./validation.mjs";

const CONTACT_PATH = "/api/contact";
const HEALTH_PATH = "/api/contact/health";
const MAX_BODY_BYTES = 16 * 1024;

const missingSettings = findMissingSettings();
if (missingSettings.length > 0) {
  console.error(`Missing required settings: ${missingSettings.join(", ")}`);
  process.exit(1);
}

const rateLimiter = createRateLimiter(config.rateLimit);

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

function getClientId(request) {
  return request.headers["x-real-ip"] ?? request.socket.remoteAddress ?? "unknown";
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let receivedBytes = 0;
    let isTooLarge = false;
    const chunks = [];

    request.on("data", (chunk) => {
      if (isTooLarge) return;
      receivedBytes += chunk.length;
      if (receivedBytes > MAX_BODY_BYTES) {
        isTooLarge = true;
        reject(new Error("body_too_large"));
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => {
      if (isTooLarge) return;
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("invalid_json"));
      }
    });

    request.on("error", reject);
  });
}

async function handleInquiry(request, response) {
  const clientId = getClientId(request);

  if (rateLimiter.isLimited(clientId)) {
    sendJson(response, 429, { error: "too_many_requests" });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(request);
  } catch (error) {
    const isTooLarge = error.message === "body_too_large";
    if (isTooLarge) {
      response.setHeader("Connection", "close");
      response.on("finish", () => request.destroy());
    }
    sendJson(response, isTooLarge ? 413 : 400, { error: error.message });
    return;
  }

  if (isHoneypotFilled(payload)) {
    sendJson(response, 200, { ok: true });
    return;
  }

  const { values, errors, isValid } = validateInquiry(payload);
  if (!isValid) {
    sendJson(response, 400, { error: "invalid", fields: errors });
    return;
  }

  rateLimiter.record(clientId);

  try {
    await sendInquiry(values);
    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error("Could not send inquiry:", error.message);
    sendJson(response, 502, { error: "send_failed" });
  }
}

const server = http.createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://localhost");

  if (pathname === HEALTH_PATH && request.method === "GET") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (pathname !== CONTACT_PATH) {
    sendJson(response, 404, { error: "not_found" });
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "method_not_allowed" });
    return;
  }

  await handleInquiry(request, response);
});

server.listen(config.port, () => {
  console.log(`Contact API listening on port ${config.port}${config.isDryRun ? " (dry run)" : ""}`);
});

process.on("SIGTERM", () => server.close(() => process.exit(0)));
