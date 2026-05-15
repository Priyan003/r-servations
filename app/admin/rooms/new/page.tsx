import { createRoom } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RoomFormClient from "./RoomFormClient";

export default async function NewRoomPage() {
  const hotels = await prisma.hotel.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/rooms" className="text-gray-400 hover:text-dark text-sm flex items-center gap-1"><ArrowLeft size={14} /> Retour</Link>
        <h1 className="text-3xl font-extrabold text-dark">Nouvelle chambre</h1>
      </div>
      <RoomFormClient hotels={hotels} action={createRoom} submitLabel="Créer la chambre" />
    </div>
  );
}
