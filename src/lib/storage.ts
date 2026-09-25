import { put } from "@vercel/blob";

export const MAX_PHOTO_BYTES = 12 * 1024 * 1024;

export const ACCEPTED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export function isAcceptedPhotoType(t: string): boolean {
  return (ACCEPTED_PHOTO_TYPES as readonly string[]).includes(t);
}

export async function storePhoto(
  file: File,
): Promise<{ url: string; key: string } | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpg";
  const key = `faveiro/${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const blob = await put(key, file, {
    access: "public",
    contentType: file.type,
  });
  return { url: blob.url, key };
}
