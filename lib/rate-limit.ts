import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

type Bucket = { timestamps: number[] };

const memory = new Map<string, Bucket>();

function memoryLimit(key: string): { success: boolean } {
  const now = Date.now();
  const bucket = memory.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);
  if (bucket.timestamps.length >= LIMIT) {
    memory.set(key, bucket);
    return { success: false };
  }
  bucket.timestamps.push(now);
  memory.set(key, bucket);
  return { success: true };
}

let redisLimiter: Ratelimit | null | undefined;

function getRedisLimiter(): Ratelimit | null {
  if (redisLimiter !== undefined) return redisLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    redisLimiter = null;
    return null;
  }
  redisLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(LIMIT, "10 m"),
    analytics: false,
    prefix: "galan-form",
  });
  return redisLimiter;
}

export async function rateLimit(identifier: string): Promise<{ success: boolean }> {
  const redis = getRedisLimiter();
  if (redis) {
    try {
      const result = await redis.limit(identifier);
      return { success: result.success };
    } catch {
      return memoryLimit(identifier);
    }
  }
  return memoryLimit(identifier);
}

export function ipKey(ip: string): string {
  const trimmed = ip.trim();
  if (trimmed.includes(":")) {
    return trimmed.split(":").slice(0, 4).join(":");
  }
  return trimmed;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return ipKey(first);
  }
  const real = request.headers.get("x-real-ip");
  if (real) return ipKey(real.trim());
  return "unknown";
}
