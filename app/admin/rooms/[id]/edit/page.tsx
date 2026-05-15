import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateRoom } from "@/app/actions/admin";
import RoomFormClient from "../../new/RoomFormClient";

type Params = Promise<{ id: string }>;

export default async function EditRoomPage({ params }: { params: Params }) {
  const { id } = await params;
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) notFound();

  const hotels = await prisma.hotel.findMany({ orderBy: { name: "asc" } });
  const boundAction = updateRoom.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/rooms" className="text-gray-400 hover:text-dark text-sm flex items-center gap-1"><ArrowLeft size={14} /> Retour</Link>
        <h1 className="text-3xl font-extrabold text-dark">Modifier la chambre</h1>
      </div>
      <RoomFormClient
        hotels={hotels}
        action={boundAction}
        submitLabel="Sauvegarder"
        defaultValues={room}
      />
    </div>
  );
}
