import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import RoomCard from "@/components/RoomCard";

type Params = Promise<{ id: string }>;

export default async function HotelDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  const hotel = await prisma.hotel.findUnique({
    where: { id },
    include: { rooms: true },
  });

  if (!hotel) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex gap-2">
        <Link href="/hotels" className="hover:text-rose-600">Hôtels</Link>
        <span>/</span>
        <span className="text-dark font-medium">{hotel.name}</span>
      </nav>

      {/* Header */}
      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden mb-8">
        <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-extrabold drop-shadow">{hotel.name}</h1>
          <p className="mt-1 text-rose-200">{hotel.address}, {hotel.city}</p>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="text-dark font-bold">{hotel.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-rose-50 rounded-2xl p-6 mb-10">
        <h2 className="font-bold text-dark text-xl mb-3">À propos de cet hôtel</h2>
        <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
      </div>

      {/* Rooms */}
      <div>
        <h2 className="text-2xl font-extrabold text-dark mb-6">
          Chambres disponibles ({hotel.rooms.length})
        </h2>
        {hotel.rooms.length === 0 ? (
          <p className="text-gray-400">Aucune chambre disponible pour le moment.</p>
        ) : (
          <div className="space-y-6">
            {hotel.rooms.map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
