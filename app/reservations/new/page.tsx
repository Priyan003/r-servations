import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReservationFormClient from "./ReservationFormClient";

type SearchParams = Promise<{ roomId?: string }>;

export default async function NewReservationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const { roomId } = await searchParams;
  if (!roomId) redirect("/hotels");

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: { hotel: true },
  });
  if (!room) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a
            href={`/hotels/${room.hotel.id}`}
            className="text-sm text-gray-400 hover:text-rose-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Retour à {room.hotel.name}
          </a>
          <h1 className="text-3xl font-extrabold text-dark mt-2">
            Finaliser votre réservation
          </h1>
        </div>

        <ReservationFormClient room={room} userName={session.name} />
      </div>
    </div>
  );
}
