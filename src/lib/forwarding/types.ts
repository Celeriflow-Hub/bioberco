import type { Sighting } from "@prisma/client";

export interface ValidatedSighting {
  id: string;
  protocol: string;
  photoUrl: string;
  latitude: number;
  longitude: number;
}

export interface ForwardResult {
  ok: boolean;
  externalRef?: string;
  error?: string;
}

export interface SightingForwarder {
  forward(sighting: ValidatedSighting): Promise<ForwardResult>;
}

export function forwardingEnabled(): boolean {
  return process.env.ENABLE_EXTERNAL_FORWARDING === "true";
}

export function toValidated(s: Sighting): ValidatedSighting {
  return {
    id: s.id,
    protocol: s.protocol,
    photoUrl: s.photoUrl,
    latitude: Number(s.latitude),
    longitude: Number(s.longitude),
  };
}
