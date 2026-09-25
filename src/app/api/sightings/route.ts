import { NextResponse } from "next/server";
import { sightingSchema } from "@/lib/validation";
import { generateProtocol } from "@/lib/protocol";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Requisição inválida." },
      { status: 400 },
    );
  }

  const parsed = sightingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Verifique os campos e tente novamente." },
      { status: 400 },
    );
  }

  // Base Vercel (Fase 1/2): protocolo gerado no SERVIDOR, sem Math.random.
  // Persistência em PostgreSQL + upload em Blob entram na Fase 3.
  const protocol = generateProtocol();

  return NextResponse.json({ success: true, protocol });
}
