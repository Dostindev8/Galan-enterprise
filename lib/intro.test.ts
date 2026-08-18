import { describe, expect, it } from "vitest";
import {
  DESKTOP_TIMING,
  MOBILE_TIMING,
  splitHeroTitle,
  starCount,
} from "./intro";

describe("splitHeroTitle", () => {
  it("splits the English hero title on sentence boundaries", () => {
    expect(splitHeroTitle("Moving Freight. Delivering Trust.")).toEqual([
      "Moving Freight.",
      "Delivering Trust.",
    ]);
  });

  it("splits the Spanish hero title on sentence boundaries", () => {
    expect(splitHeroTitle("Movemos carga. Entregamos confianza.")).toEqual([
      "Movemos carga.",
      "Entregamos confianza.",
    ]);
  });

  it("keeps a single-line title intact", () => {
    expect(splitHeroTitle("Galan Operations")).toEqual(["Galan Operations"]);
  });
});

describe("intro timing", () => {
  it("keeps desktop longer than mobile and within the spec window", () => {
    const desktopTotal = DESKTOP_TIMING.exitAt + DESKTOP_TIMING.overlayExit;
    const mobileTotal = MOBILE_TIMING.exitAt + MOBILE_TIMING.overlayExit;
    expect(desktopTotal).toBeGreaterThanOrEqual(3.5);
    expect(desktopTotal).toBeLessThanOrEqual(5);
    expect(mobileTotal).toBeGreaterThanOrEqual(2.5);
    expect(mobileTotal).toBeLessThanOrEqual(3.5);
    expect(desktopTotal).toBeGreaterThan(mobileTotal);
  });

  it("uses fewer stars on compact viewports", () => {
    expect(starCount(true)).toBe(12);
    expect(starCount(false)).toBe(20);
  });
});
