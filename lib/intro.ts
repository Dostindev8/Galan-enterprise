export const INTRO_STORAGE_KEY = "galan_intro_seen";
export const INTRO_STORAGE_VALUE = "1";
export const INTRO_COMPLETE_EVENT = "galan:intro-complete";

export function markIntroSeen(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, INTRO_STORAGE_VALUE);
  } catch {
    /* private mode / blocked storage */
  }
  document.documentElement.dataset.intro = "seen";
  window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
}

export function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === INTRO_STORAGE_VALUE;
  } catch {
    return false;
  }
}

export function prefersSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return Boolean(connection?.saveData);
}

export function isCompactIntroViewport(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 640px)").matches;
}

export function splitHeroTitle(title: string): string[] {
  const parts = title
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [title];
}

export type IntroTiming = {
  skyFade: number;
  gradientDelay: number;
  gradient: number;
  truckDelay: number;
  truck: number;
  exitAt: number;
  overlayExit: number;
  skipExit: number;
};

export const DESKTOP_TIMING: IntroTiming = {
  skyFade: 0.6,
  gradientDelay: 0.4,
  gradient: 1.8,
  truckDelay: 0.6,
  truck: 1.6,
  exitAt: 2.8,
  overlayExit: 0.9,
  skipExit: 0.3,
};

export const MOBILE_TIMING: IntroTiming = {
  skyFade: 0.5,
  gradientDelay: 0.28,
  gradient: 1.2,
  truckDelay: 0.4,
  truck: 1.15,
  exitAt: 1.8,
  overlayExit: 0.7,
  skipExit: 0.3,
};

export const REDUCED_EXIT = 0.3;

export function starCount(compact: boolean): number {
  return compact ? 12 : 20;
}
