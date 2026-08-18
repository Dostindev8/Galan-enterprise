import "server-only";
import { Resend } from "resend";
import { escapeHtml } from "./security";

export type MailPayload = {
  subject: string;
  heading: string;
  fields: Record<string, string>;
};

export type MailResult =
  | { ok: true }
  | { ok: false; code: "unconfigured" | "send_failed" };

function rows(fields: Record<string, string>): string {
  return Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#a6abb3;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#f5f6f7;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
}

export async function sendNotificationEmail(payload: MailPayload): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { ok: false, code: "unconfigured" };
  }

  const resend = new Resend(apiKey);
  const html = `
    <div style="background:#0A0B0D;color:#f5f6f7;font-family:Inter,Arial,sans-serif;padding:24px;">
      <h1 style="color:#D4AF37;font-size:20px;">${escapeHtml(payload.heading)}</h1>
      <table style="width:100%;border-collapse:collapse;background:#121417;border:1px solid #5B5F66;">${rows(payload.fields)}</table>
    </div>
  `;
  const text = Object.entries(payload.fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject: payload.subject,
      html,
      text,
    });
    if (result.error) return { ok: false, code: "send_failed" };
    return { ok: true };
  } catch {
    return { ok: false, code: "send_failed" };
  }
}
