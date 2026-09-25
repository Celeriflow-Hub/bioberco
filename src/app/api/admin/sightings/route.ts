import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/auth";

export async function GET(req: Request) {
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
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const status = url.searchParams.get("status") ?? "";

  const sightings = await prisma.sighting.findMany({
    where: {
      ...(status
        ? { status: status as never }
        : {}),
      ...(q
        ? {
            OR: [
              { protocol: { contains: q, mode: "insensitive" } },
              { observerName: { contains: q, mode: "insensitive" } },
              { observerEmail: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ success: true, sightings });
}
