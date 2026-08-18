import { NextResponse } from "next/server";
import { applySchema, contactSchema } from "@/lib/validations";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { isAllowedOrigin, isHoneypotFilled } from "@/lib/security";
import { sendNotificationEmail } from "@/lib/email";
import { COMPANY_NAME } from "@/lib/constants";

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, code: "origin" }, { status: 403 });
  }

  const limited = await rateLimit(clientIp(request));
  if (!limited.success) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  if (isHoneypotFilled(record.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const kind = record.kind === "apply" ? "apply" : "contact";

  if (kind === "apply") {
    const parsed = applySchema.safeParse(record);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
    }
    const mail = await sendNotificationEmail({
      subject: `[${COMPANY_NAME}] Driver application — ${parsed.data.name}`,
      heading: "New driver application",
      fields: {
        Name: parsed.data.name,
        Email: parsed.data.email,
        Phone: parsed.data.phone,
        "City / State": parsed.data.cityState,
        Experience: parsed.data.experience,
        License: parsed.data.licenseStatus,
        "Work authorization": "Confirmed",
        Notes: parsed.data.message ?? "",
      },
    });
    if (!mail.ok) {
      return NextResponse.json({ ok: false, code: mail.code }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(record);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }
  const mail = await sendNotificationEmail({
    subject: `[${COMPANY_NAME}] ${parsed.data.subject} — ${parsed.data.name}`,
    heading: "New website inquiry",
    fields: {
      Name: parsed.data.name,
      Email: parsed.data.email,
      Phone: parsed.data.phone,
      Subject: parsed.data.subject,
      Message: parsed.data.message,
    },
  });
  if (!mail.ok) {
    return NextResponse.json({ ok: false, code: mail.code }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
