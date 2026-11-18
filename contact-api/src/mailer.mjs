import nodemailer from "nodemailer";
import { config } from "./config.mjs";

function createTransport() {
  if (config.isDryRun) return nodemailer.createTransport({ jsonTransport: true });

  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.isSecure,
    auth: { user: config.smtp.user, pass: config.smtp.password },
  });
}

const transport = createTransport();

const toSingleLine = (text) => text.replace(/\s+/g, " ").trim();

function buildBody({ name, email, phone, message }) {
  const details = [`Name: ${name}`, `Email: ${email}`];
  if (phone) details.push(`Phone: ${phone}`);
  return [message, "", "---", ...details, "", "Sent from the garbiagroup.com contact form."].join("\n");
}

export async function sendInquiry(inquiry) {
  const info = await transport.sendMail({
    from: `GarBia website <${config.mailFrom}>`,
    to: config.mailTo,
    replyTo: { name: toSingleLine(inquiry.name), address: inquiry.email },
    subject: `Website inquiry from ${toSingleLine(inquiry.name)}`,
    text: buildBody(inquiry),
  });

  if (config.isDryRun) console.log("Dry run, message not sent:", info.message);
}
