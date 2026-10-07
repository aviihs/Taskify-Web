import type { ContactMessage } from "@/lib/contact-message";

interface ContactFormSubmission extends ContactMessage {
  // Honeypot: real visitors leave this empty.
  botField: string;
}

// Browser-side call to our own API route, which forwards to the webhook.
export async function submitContactForm(submission: ContactFormSubmission) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error(`Contact form failed with ${response.status}`);
  }
}
