import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(7, "invalidPhone")
  .max(24, "invalidPhone")
  .regex(/^[+\d][\d\s().-]{6,}$/u, "invalidPhone");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "minName").max(80),
  email: z.string().trim().email("invalidEmail").max(120),
  phone,
  subject: z.enum(["general", "careers", "partnership"]),
  message: z.string().trim().min(10, "minMessage").max(2000),
  company_website: z.string().max(200).optional(),
});

export const applySchema = z.object({
  name: z.string().trim().min(2, "minName").max(80),
  email: z.string().trim().email("invalidEmail").max(120),
  phone,
  cityState: z.string().trim().min(2, "required").max(80),
  experience: z.string().trim().min(1, "required").max(20),
  licenseStatus: z.enum(["valid", "other"]),
  workAuth: z.boolean().refine((value) => value === true, { message: "mustAuth" }),
  message: z.string().trim().max(2000).optional(),
  company_website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ApplyInput = z.infer<typeof applySchema>;
