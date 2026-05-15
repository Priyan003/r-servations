import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateHotel } from "@/app/actions/admin";
import HotelFormClient from "./HotelFormClient";

type Params = Promise<{ id: string }>;

export default async function EditHotelPage({ params }: { params: Params }) {
  const { id } = await params;
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) notFound();

  const boundAction = updateHotel.bind(null, id);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/hotels" className="text-gray-400 hover:text-dark text-sm flex items-center gap-1"><ArrowLeft size={14} /> Retour</Link>
        <h1 className="text-3xl font-extrabold text-dark">Modifier l&apos;hôtel</h1>
      </div>
      <HotelFormClient action={boundAction} defaultValues={hotel} />
    </div>
  );
}
