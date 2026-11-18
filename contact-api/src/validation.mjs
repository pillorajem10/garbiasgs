const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

const MAX_LENGTHS = {
  name: 100,
  email: 200,
  phone: 40,
  message: 5000,
};

function readText(payload, fieldName) {
  const value = payload?.[fieldName];
  return typeof value === "string" ? value.trim() : "";
}

export function validateInquiry(payload) {
  const values = {
    name: readText(payload, "name"),
    email: readText(payload, "email"),
    phone: readText(payload, "phone"),
    message: readText(payload, "message"),
  };

  const errors = {};

  if (!values.name) errors.name = "Enter your name.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Tell us a little about your project (at least ${MIN_MESSAGE_LENGTH} characters).`;
  }

  Object.entries(MAX_LENGTHS).forEach(([fieldName, maxLength]) => {
    if (values[fieldName].length > maxLength && !errors[fieldName]) {
      errors[fieldName] = `This is too long (maximum ${maxLength} characters).`;
    }
  });

  return { values, errors, isValid: Object.keys(errors).length === 0 };
}

export function isHoneypotFilled(payload) {
  return readText(payload, "website") !== "";
}
