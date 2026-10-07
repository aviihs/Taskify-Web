import contactContent from "@/data/contact.json";
import { validateContactMessage } from "@/lib/contact-message";
import { sendContactMessage } from "@/services/contactMessageService";

// Hidden form field only bots fill in. Kept in sync with ContactForm.
const HONEYPOT_FIELD = "botField";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Pretend success so bots don't learn they were filtered out.
  const isBot =
    typeof body === "object" &&
    body !== null &&
    Boolean((body as Record<string, unknown>)[HONEYPOT_FIELD]);
  if (isBot) {
    return Response.json({ ok: true });
  }

  const validation = validateContactMessage(body, contactContent.form.topics);
  if (!validation.isValid) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  try {
    await sendContactMessage(validation.contactMessage);
  } catch (error) {
    console.error("Failed to deliver contact message", error);
    return Response.json(
      { error: "We couldn't send your message right now" },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
