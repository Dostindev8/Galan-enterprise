"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Field, FormStatus, Honeypot, fieldClass } from "./Fields";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const t = useTranslations("forms");
  const [serverMsg, setServerMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
      company_website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind: "contact" }),
      });
      const data = (await res.json()) as { ok?: boolean; code?: string };
      if (res.status === 429) {
        setServerMsg({ ok: false, text: t("rateLimited") });
        return;
      }
      if (!res.ok || !data.ok) {
        setServerMsg({
          ok: false,
          text: data.code === "unconfigured" ? t("emailUnconfigured") : t("error"),
        });
        return;
      }
      form.reset();
      setServerMsg({ ok: true, text: t("success") });
    } catch {
      setServerMsg({ ok: false, text: t("error") });
    }
  });

  const msg = (key: keyof ContactInput, fallback: "minName" | "invalidEmail" | "invalidPhone" | "minMessage") =>
    form.formState.errors[key]?.message ? t(fallback) : undefined;

  return (
    <form onSubmit={onSubmit} className="relative space-y-4" noValidate>
      <Honeypot label={t("honeypot")} />
      <input type="hidden" {...form.register("company_website")} />
      <Field label={t("name")} error={msg("name", "minName")}>
        <input {...form.register("name")} autoComplete="name" className={fieldClass} />
      </Field>
      <Field label={t("email")} error={msg("email", "invalidEmail")}>
        <input type="email" {...form.register("email")} autoComplete="email" className={fieldClass} />
      </Field>
      <Field label={t("phone")} error={msg("phone", "invalidPhone")}>
        <input type="tel" {...form.register("phone")} autoComplete="tel" className={fieldClass} />
      </Field>
      <Field label={t("subject")}>
        <select {...form.register("subject")} className={fieldClass}>
          <option value="general">{t("subjectGeneral")}</option>
          <option value="careers">{t("subjectCareers")}</option>
          <option value="partnership">{t("subjectPartnership")}</option>
        </select>
      </Field>
      <Field label={t("message")} error={msg("message", "minMessage")}>
        <textarea {...form.register("message")} rows={5} className={fieldClass} />
      </Field>
      {serverMsg ? <FormStatus ok={serverMsg.ok} text={serverMsg.text} /> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
