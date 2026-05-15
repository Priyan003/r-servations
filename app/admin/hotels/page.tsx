import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteHotel } from "@/app/actions/admin";

export default async function AdminHotelsPage() {
  const hotels = await prisma.hotel.findMany({
    include: { _count: { select: { rooms: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-dark">Hôtels</h1>
        <Link
          href="/admin/hotels/new"
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          + Ajouter un hôtel
        </Link>
      </div>

      <div className="grid gap-4">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-5">
            <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={hotel.imageUrl} alt={hotel.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-dark">{hotel.name}</h3>
              <p className="text-gray-500 text-sm flex items-center gap-1">{hotel.city} — <Star size={12} className="text-yellow-400 fill-yellow-400" /> {hotel.rating.toFixed(1)}</p>
              <p className="text-gray-400 text-xs mt-0.5">{hotel._count.rooms} chambre(s)</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/hotels/${hotel.id}/edit`}
                className="text-sm text-dark border border-gray-200 hover:border-rose-300 px-4 py-2 rounded-lg transition-colors"
              >
                Modifier
              </Link>
              <form action={async () => { "use server"; await deleteHotel(hotel.id); }}>
                <button
                  type="submit"
                  className="text-sm text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}
        {hotels.length === 0 && (
          <p className="text-center text-gray-400 py-12">Aucun hôtel. Commencez par en créer un.</p>
        )}
      </div>
    </div>
  );
}
