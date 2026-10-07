interface MailtoOptions {
  subject?: string;
  body?: string;
}

export function buildMailtoLink(
  email: string,
  { subject, body }: MailtoOptions = {}
) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);

  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  const query = params.toString().replace(/\+/g, "%20");
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}
