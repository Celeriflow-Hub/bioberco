import { z } from "zod";

export const sightingSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracyMeters: z.number().positive().nullish(),
  addressReference: z.string().trim().min(5).max(1000),
  observerName: z.string().trim().min(3).max(120),
  observerPhone: z.string().trim().min(8).max(25),
  observerEmail: z.string().trim().email().max(160),
  consent: z.literal(true),
  photoName: z.string().trim().min(1).max(220),
  photoSize: z.number().int().positive().max(12 * 1024 * 1024),
  photoType: z.enum(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]),
});

export type SightingInput = z.infer<typeof sightingSchema>;
