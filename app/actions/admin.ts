"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Non autorisé");
  }
  return session;
}

// ── Hotels ──────────────────────────────────────────────

export async function createHotel(prevState: { error?: string }, formData: FormData) {
  await requireAdmin();

  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    imageUrl: formData.get("imageUrl") as string,
    rating: parseFloat(formData.get("rating") as string) || 0,
  };

  if (!data.name || !data.description || !data.address || !data.city || !data.imageUrl) {
    return { error: "Tous les champs sont requis" };
  }

  await prisma.hotel.create({ data });
  redirect("/admin/hotels");
}

export async function updateHotel(id: string, prevState: { error?: string }, formData: FormData) {
  await requireAdmin();

  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    imageUrl: formData.get("imageUrl") as string,
    rating: parseFloat(formData.get("rating") as string) || 0,
  };

  await prisma.hotel.update({ where: { id }, data });
  redirect("/admin/hotels");
}

export async function deleteHotel(id: string): Promise<void> {
  await requireAdmin();
  await prisma.hotel.delete({ where: { id } });
  revalidatePath("/admin/hotels");
}

// ── Rooms ──────────────────────────────────────────────

export async function createRoom(prevState: { error?: string }, formData: FormData) {
  await requireAdmin();

  const data = {
    hotelId: formData.get("hotelId") as string,
    name: formData.get("name") as string,
    type: formData.get("type") as "SINGLE" | "DOUBLE" | "SUITE" | "DELUXE",
    description: formData.get("description") as string,
    pricePerNight: parseFloat(formData.get("pricePerNight") as string),
    capacity: parseInt(formData.get("capacity") as string),
    imageUrl: formData.get("imageUrl") as string,
    amenities: formData.get("amenities") as string,
  };

  if (!data.hotelId || !data.name || !data.type || isNaN(data.pricePerNight)) {
    return { error: "Tous les champs sont requis" };
  }

  await prisma.room.create({ data });
  redirect("/admin/rooms");
}

export async function updateRoom(id: string, prevState: { error?: string }, formData: FormData) {
  await requireAdmin();

  const data = {
    name: formData.get("name") as string,
    type: formData.get("type") as "SINGLE" | "DOUBLE" | "SUITE" | "DELUXE",
    description: formData.get("description") as string,
    pricePerNight: parseFloat(formData.get("pricePerNight") as string),
    capacity: parseInt(formData.get("capacity") as string),
    imageUrl: formData.get("imageUrl") as string,
    amenities: formData.get("amenities") as string,
  };

  await prisma.room.update({ where: { id }, data });
  redirect("/admin/rooms");
}

export async function deleteRoom(id: string): Promise<void> {
  await requireAdmin();
  await prisma.room.delete({ where: { id } });
  revalidatePath("/admin/rooms");
}

// ── Reservations ─────────────────────────────────────

export async function updateReservationStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
): Promise<void> {
  await requireAdmin();
  await prisma.reservation.update({ where: { id }, data: { status } });
  revalidatePath("/admin/reservations");
}
