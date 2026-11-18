import { useId, useState } from "react";
import Button from "@components/Button";
import { BUSINESS } from "@/seo/constants";
import { validateField, validateForm } from "./validation";
import styles from "./index.module.css";

const CONTACT_ENDPOINT = "/api/contact";
const EMPTY_VALUES = { name: "", email: "", phone: "", message: "", website: "" };

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone number (optional)", type: "tel", autoComplete: "tel" },
  { name: "message", label: "How can we help?", isMultiline: true },
];

async function sendInquiry(values) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const result = await response.json().catch(() => ({}));
  return { isOk: response.ok, fieldErrors: result.fields };
}

export default function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === "website") return;
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  };

  const focusField = (fieldName) => {
    document.getElementById(`${formId}-${fieldName}`)?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const formErrors = validateForm(values);
    setErrors(formErrors);

    const [firstInvalidField] = Object.keys(formErrors);
    if (firstInvalidField) {
      focusField(firstInvalidField);
      return;
    }

    setStatus("sending");
    try {
      const { isOk, fieldErrors } = await sendInquiry(values);
      if (isOk) {
        setStatus("sent");
        return;
      }
      if (fieldErrors) {
        setErrors(fieldErrors);
        focusField(Object.keys(fieldErrors)[0]);
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  };

  const handleSendAnother = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div className={styles.success} role="status">
        <h3 className={styles.successTitle}>Thank you, your message was sent</h3>
        <p>
          We received your inquiry and will reply to {values.email}. For urgent matters you can
          also call{" "}
          <a href={`tel:${BUSINESS.telephone}`} className={styles.successLink}>
            {BUSINESS.telephoneDisplay}
          </a>
          .
        </p>
        <Button variant="outline" onClick={handleSendAnother}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {FIELDS.map(({ name, label, type, autoComplete, isMultiline }) => {
        const fieldId = `${formId}-${name}`;
        const errorId = `${fieldId}-error`;
        const hasError = Boolean(errors[name]);
        const sharedProps = {
          id: fieldId,
          name,
          value: values[name],
          placeholder: " ",
          className: styles.input,
          onChange: handleChange,
          onBlur: handleBlur,
          "aria-invalid": hasError,
          "aria-describedby": hasError ? errorId : undefined,
          "aria-required": name !== "phone",
        };

        return (
          <div key={name} className={styles.field}>
            {isMultiline ? (
              <textarea rows={5} {...sharedProps} />
            ) : (
              <input type={type} autoComplete={autoComplete} {...sharedProps} />
            )}
            <label htmlFor={fieldId} className={styles.label}>
              {label}
            </label>
            {hasError && (
              <p id={errorId} className={styles.error}>
                {errors[name]}
              </p>
            )}
          </div>
        );
      })}

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      {status === "failed" && (
        <p className={styles.failure} role="alert">
          We could not send your message. Please try again, or email us at{" "}
          <a href={`mailto:${BUSINESS.email}`} className={styles.successLink}>
            {BUSINESS.email}
          </a>
          .
        </p>
      )}

      <Button type="submit" hasArrow disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
