import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/auth";

const bodySchema = z.object({
  id: z.string().uuid(),
  status: z.enum([
    "PENDING_VALIDATION",
    "VALIDATED",
    "REJECTED",
    "NEEDS_INFORMATION",
  ]),
  internalNotes: z.string().max(2000).nullish(),
});

export async function PATCH(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Não autorizado." },
      { status: 401 },
    );
  }
  const prisma = getPrisma();
  if (!prisma) {
    return NextResponse.json(
      { success: false, error: "Banco não configurado." },
      { status: 503 },
    );
  }
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Dados inválidos." },
      { status: 400 },
    );
  }
  const updated = await prisma.sighting.update({
    where: { id: parsed.data.id },
    data: {
      status: parsed.data.status,
      internalNotes: parsed.data.internalNotes ?? undefined,
    },
    select: { id: true, protocol: true, status: true },
  });
  return NextResponse.json({ success: true, sighting: updated });
}
