const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

const VALIDATORS = {
  name: (value) => (value.trim() ? "" : "Enter your name."),
  email: (value) => {
    if (!value.trim()) return "Enter your email address.";
    return EMAIL_PATTERN.test(value.trim()) ? "" : "Enter a valid email address.";
  },
  phone: () => "",
  message: (value) =>
    value.trim().length >= MIN_MESSAGE_LENGTH
      ? ""
      : `Tell us a little about your project (at least ${MIN_MESSAGE_LENGTH} characters).`,
};

export function validateField(fieldName, value) {
  return VALIDATORS[fieldName](value);
}

export function validateForm(values) {
  return Object.keys(VALIDATORS).reduce((errors, fieldName) => {
    const message = validateField(fieldName, values[fieldName]);
    return message ? { ...errors, [fieldName]: message } : errors;
  }, {});
}
