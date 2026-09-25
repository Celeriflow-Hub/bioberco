import { randomUUID } from "node:crypto";

export function generateProtocol(prefix = "BIO"): string {
  const year = new Date().getFullYear();
  const rand = randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `${prefix}-${year}-${rand}`;
}
