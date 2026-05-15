import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(hotel);
}
