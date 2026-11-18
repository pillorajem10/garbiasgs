const MINUTE_MS = 60 * 1000;

function readNumber(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const config = {
  port: readNumber("PORT", 3000),
  isDryRun: process.env.MAIL_DRY_RUN === "1",
  mailTo: process.env.MAIL_TO,
  mailFrom: process.env.MAIL_FROM,
  smtp: {
    host: process.env.SMTP_HOST,
    port: readNumber("SMTP_PORT", 587),
    isSecure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
  },
  rateLimit: {
    maxRequests: readNumber("RATE_LIMIT_MAX", 5),
    windowMs: readNumber("RATE_LIMIT_WINDOW_MINUTES", 60) * MINUTE_MS,
  },
};

export function findMissingSettings() {
  if (config.isDryRun) return [];

  const requiredSettings = {
    MAIL_TO: config.mailTo,
    MAIL_FROM: config.mailFrom,
    SMTP_HOST: config.smtp.host,
    SMTP_USER: config.smtp.user,
    SMTP_PASS: config.smtp.password,
  };

  return Object.entries(requiredSettings)
    .filter(([, value]) => !value)
    .map(([name]) => name);
}
