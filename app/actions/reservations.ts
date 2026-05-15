"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export type ReservationState = {
  error?: string;
};

export async function createReservation(
  prevState: ReservationState,
  formData: FormData
): Promise<ReservationState> {
  const session = await getSession();
  if (!session) return { error: "Vous devez être connecté pour réserver" };

  const roomId = formData.get("roomId") as string;
  const checkInStr = formData.get("checkIn") as string;
  const checkOutStr = formData.get("checkOut") as string;

  if (!roomId || !checkInStr || !checkOutStr) {
    return { error: "Tous les champs sont requis" };
  }

  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);
  const now = new Date();

  if (checkIn < now) return { error: "La date d'arrivée doit être dans le futur" };
  if (checkOut <= checkIn) return { error: "La date de départ doit être après l'arrivée" };

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) return { error: "Chambre introuvable" };

  const conflict = await prisma.reservation.findFirst({
    where: {
      roomId,
      status: { not: "CANCELLED" },
      AND: [
        { checkIn: { lt: checkOut } },
        { checkOut: { gt: checkIn } },
      ],
    },
  });

  if (conflict) return { error: "Cette chambre est déjà réservée pour ces dates" };

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * room.pricePerNight;

  await prisma.reservation.create({
    data: {
      userId: session.userId,
      roomId,
      checkIn,
      checkOut,
      totalPrice,
      status: "PENDING",
    },
  });

  redirect("/reservations");
}

export async function cancelReservation(reservationId: string): Promise<void> {
  const session = await getSession();
  if (!session) return;

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation || reservation.userId !== session.userId) return;
  if (reservation.status !== "PENDING") return;

  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/reservations");
}
