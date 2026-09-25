import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { sightingFieldsSchema } from "@/lib/validation";
import { generateProtocol } from "@/lib/protocol";
import { getPrisma } from "@/lib/db";
import {
  MAX_PHOTO_BYTES,
  isAcceptedPhotoType,
  storePhoto,
} from "@/lib/storage";

function num(v: FormDataEntryValue | null): number | null {
  if (typeof v !== "string" || v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

// Rate-limit simples em memória (por instância): 10 envios/min por IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 10;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Requisição inválida." },
      { status: 400 },
    );
  }

  const photo = form.get("photo");

  // Honeypot: bots preenchem o campo invisível; finge sucesso sem salvar.
  const honey = form.get("website");
  if (typeof honey === "string" && honey.trim() !== "") {
    return NextResponse.json({
      success: true,
      protocol: generateProtocol(),
      persisted: false,
    });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { success: false, error: "Muitas tentativas. Aguarde um minuto." },
      { status: 429 },
    );
  }

  if (!(photo instanceof File) || photo.size <= 0) {
    return NextResponse.json(
      { success: false, error: "Foto é obrigatória." },
      { status: 400 },
    );
  }
  if (!isAcceptedPhotoType(photo.type)) {
    return NextResponse.json(
      { success: false, error: "Envie uma imagem JPG, PNG, WEBP ou HEIC." },
      { status: 400 },
    );
  }
  if (photo.size > MAX_PHOTO_BYTES) {
    return NextResponse.json(
      { success: false, error: "Imagem deve ter até 12 MB." },
      { status: 400 },
    );
  }

  const accRaw = form.get("accuracyMeters");
  const parsed = sightingFieldsSchema.safeParse({
    latitude: num(form.get("latitude")),
    longitude: num(form.get("longitude")),
    accuracyMeters:
      typeof accRaw === "string" && accRaw.trim() !== ""
        ? Number(accRaw)
        : accRaw == null || accRaw === ""
          ? null
          : accRaw,
    addressReference: form.get("addressReference"),
    observerName: form.get("observerName"),
    observerPhone: form.get("observerPhone"),
    observerEmail: form.get("observerEmail"),
    consent: form.get("consent") === "true" || form.get("consent") === "on",
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Verifique os campos e tente novamente." },
      { status: 400 },
    );
  }

  const prisma = getPrisma();
  const data = parsed.data;

  // Sem banco configurado: protocolo server-side provisório (não persistido).
  if (!prisma) {
    return NextResponse.json({
      success: true,
      protocol: generateProtocol(),
      persisted: false,
    });
  }

  // Com banco: upload real quando o Blob estiver configurado.
  const stored = await storePhoto(photo).catch(() => null);
  if (!stored) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Armazenamento de fotos ainda não configurado. Tente novamente mais tarde.",
      },
      { status: 503 },
    );
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const created = await prisma.sighting.create({
        data: {
          protocol: generateProtocol(),
          photoUrl: stored.url,
          photoStorageKey: stored.key,
          latitude: new Prisma.Decimal(data.latitude),
          longitude: new Prisma.Decimal(data.longitude),
          accuracyMeters:
            data.accuracyMeters != null
              ? new Prisma.Decimal(data.accuracyMeters)
              : null,
          addressReference: data.addressReference,
          observerName: data.observerName,
          observerPhone: data.observerPhone,
          observerEmail: data.observerEmail,
          consentAcceptedAt: new Date(),
        },
        select: { protocol: true },
      });
      return NextResponse.json({
        success: true,
        protocol: created.protocol,
        persisted: true,
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        continue; // colisão de protocolo: tenta de novo
      }
      return NextResponse.json(
        { success: false, error: "Falha ao salvar. Tente novamente." },
        { status: 500 },
      );
    }
  }
  return NextResponse.json(
    { success: false, error: "Falha ao gerar protocolo. Tente novamente." },
    { status: 500 },
  );
}
