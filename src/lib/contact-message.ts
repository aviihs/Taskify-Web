// Shape and validation rules for a contact-form message. Shared by the form
// (client-side checks) and the API route (the checks that actually count).

export interface ContactMessage {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_MESSAGE_LIMITS = {
  nameMaxLength: 100,
  emailMaxLength: 200,
  topicMaxLength: 60,
  messageMinLength: 10,
  messageMaxLength: 5000,
};

type ValidationResult =
  | { isValid: true; contactMessage: ContactMessage }
  | { isValid: false; error: string };

function readTrimmedString(source: Record<string, unknown>, key: string) {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactMessage(
  input: unknown,
  allowedTopics: string[]
): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { isValid: false, error: "Invalid request body" };
  }
  const source = input as Record<string, unknown>;
  const contactMessage: ContactMessage = {
    name: readTrimmedString(source, "name"),
    email: readTrimmedString(source, "email"),
    topic: readTrimmedString(source, "topic"),
    message: readTrimmedString(source, "message"),
  };
  const limits = CONTACT_MESSAGE_LIMITS;

  if (
    !contactMessage.name ||
    contactMessage.name.length > limits.nameMaxLength
  ) {
    return { isValid: false, error: "Please enter a valid name" };
  }
  if (
    !EMAIL_PATTERN.test(contactMessage.email) ||
    contactMessage.email.length > limits.emailMaxLength
  ) {
    return { isValid: false, error: "Please enter a valid email" };
  }
  if (!allowedTopics.includes(contactMessage.topic)) {
    return { isValid: false, error: "Please choose a topic" };
  }
  if (
    contactMessage.message.length < limits.messageMinLength ||
    contactMessage.message.length > limits.messageMaxLength
  ) {
    return { isValid: false, error: "Please write a longer message" };
  }

  return { isValid: true, contactMessage };
}
