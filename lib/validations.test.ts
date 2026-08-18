import { describe, expect, it } from "vitest";
import { applySchema, contactSchema } from "./validations";
import { ipKey } from "./rate-limit";

describe("contactSchema", () => {
  it("accepts a valid inquiry", () => {
    const parsed = contactSchema.safeParse({
      name: "Alex Rivera",
      email: "alex@example.com",
      phone: "+1 689 253 0469",
      subject: "careers",
      message: "I would like to learn about driving with Galan.",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const parsed = contactSchema.safeParse({
      name: "Alex",
      email: "not-an-email",
      phone: "6892530469",
      subject: "general",
      message: "Hello there, I have a question.",
    });
    expect(parsed.success).toBe(false);
  });
});

describe("applySchema", () => {
  it("requires work authorization", () => {
    const parsed = applySchema.safeParse({
      name: "Alex Rivera",
      email: "alex@example.com",
      phone: "6892530469",
      cityState: "Orlando, FL",
      experience: "3",
      licenseStatus: "valid",
      workAuth: false,
    });
    expect(parsed.success).toBe(false);
  });
});

describe("ipKey", () => {
  it("keeps IPv4 intact", () => {
    expect(ipKey("203.0.113.10")).toBe("203.0.113.10");
  });

  it("truncates IPv6 to a /64-style prefix", () => {
    expect(ipKey("2001:db8:85a3:8d3:1319:8a2e:370:7348")).toBe("2001:db8:85a3:8d3");
  });
});
