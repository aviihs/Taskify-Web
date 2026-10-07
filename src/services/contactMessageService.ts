import type { ContactMessage } from "@/lib/contact-message";

const WEBHOOK_TIMEOUT_MS = 10_000;

// Forwards a validated contact message to the Make.com scenario. Server-only:
// the webhook URL must never reach the browser.
export async function sendContactMessage(contactMessage: ContactMessage) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("CONTACT_WEBHOOK_URL is not configured");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...contactMessage,
      source: "taskify-web/contact",
      submittedAt: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    const reason = await response.text().catch(() => "");
    throw new Error(
      `Contact webhook responded with ${response.status}: ${reason}`
    );
  }
}
