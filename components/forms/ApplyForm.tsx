"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Field, FormStatus, Honeypot, fieldClass } from "./Fields";
import { applySchema, type ApplyInput } from "@/lib/validations";

export function ApplyForm() {
  const t = useTranslations("forms");
  const [serverMsg, setServerMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const form = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cityState: "",
      experience: "",
      licenseStatus: "valid",
      workAuth: false,
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
        body: JSON.stringify({ ...values, kind: "apply" }),
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
      setServerMsg({ ok: true, text: t("successApply") });
    } catch {
      setServerMsg({ ok: false, text: t("error") });
    }
  });

  const workAuth = form.watch("workAuth");

  return (
    <form id="apply" onSubmit={onSubmit} className="relative space-y-4" noValidate>
      <Honeypot label={t("honeypot")} />
      <input type="hidden" {...form.register("company_website")} />
      <Field label={t("name")} error={form.formState.errors.name ? t("minName") : undefined}>
        <input {...form.register("name")} autoComplete="name" className={fieldClass} />
      </Field>
      <Field label={t("email")} error={form.formState.errors.email ? t("invalidEmail") : undefined}>
        <input type="email" {...form.register("email")} autoComplete="email" className={fieldClass} />
      </Field>
      <Field label={t("phone")} error={form.formState.errors.phone ? t("invalidPhone") : undefined}>
        <input type="tel" {...form.register("phone")} autoComplete="tel" className={fieldClass} />
      </Field>
      <Field
        label={t("cityState")}
        error={form.formState.errors.cityState ? t("required") : undefined}
      >
        <input {...form.register("cityState")} autoComplete="address-level2" className={fieldClass} />
      </Field>
      <Field
        label={t("experience")}
        error={form.formState.errors.experience ? t("required") : undefined}
      >
        <input {...form.register("experience")} inputMode="numeric" className={fieldClass} />
      </Field>
      <Field label={t("licenseStatus")}>
        <select {...form.register("licenseStatus")} className={fieldClass}>
          <option value="valid">{t("licenseValid")}</option>
          <option value="other">{t("licenseOther")}</option>
        </select>
      </Field>
      <label className="flex min-h-11 items-start gap-3 text-sm text-[var(--color-text-secondary)]">
        <input
          type="checkbox"
          className="mt-1 size-4 accent-[var(--color-gold-500)]"
          checked={Boolean(workAuth)}
          onChange={(e) => form.setValue("workAuth", e.target.checked, { shouldValidate: true })}
        />
        <span>{t("workAuth")}</span>
      </label>
      {form.formState.errors.workAuth ? (
        <p className="text-sm text-[var(--color-error)]">{t("mustAuth")}</p>
      ) : null}
      <Field label={t("notes")}>
        <textarea {...form.register("message")} rows={4} className={fieldClass} />
      </Field>
      {serverMsg ? <FormStatus ok={serverMsg.ok} text={serverMsg.text} /> : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? t("sending") : t("submitApply")}
      </Button>
    </form>
  );
}
