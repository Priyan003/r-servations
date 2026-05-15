import { Search as SearchIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import HotelCard from "@/components/HotelCard";

type SearchParams = Promise<{ city?: string; q?: string }>;

export default async function HotelsPage({ searchParams }: { searchParams: SearchParams }) {
  const { city, q } = await searchParams;

  const hotels = await prisma.hotel.findMany({
    where: {
      AND: [
        city ? { city: { equals: city } } : {},
        q ? { name: { contains: q } } : {},
      ],
    },
    include: { rooms: { select: { pricePerNight: true } } },
    orderBy: { rating: "desc" },
  });

  const cities = await prisma.hotel.findMany({
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-dark mb-2">Nos hôtels</h1>
      <p className="text-gray-500 mb-8">{hotels.length} établissement(s) disponible(s)</p>

      {/* Filtres */}
      <form method="get" className="flex flex-wrap gap-3 mb-10">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Rechercher un hôtel..."
          className="border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 min-w-[220px]"
        />
        <select
          name="city"
          defaultValue={city ?? ""}
          className="border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
        >
          <option value="">Toutes les villes</option>
          {cities.map((c) => (
            <option key={c.city} value={c.city}>
              {c.city}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Filtrer
        </button>
        {(city || q) && (
          <a
            href="/hotels"
            className="text-rose-600 hover:underline text-sm flex items-center"
          >
            Effacer les filtres
          </a>
        )}
      </form>

      {hotels.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <SearchIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p>Aucun hôtel ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => {
            const minPrice =
              hotel.rooms.length > 0
                ? Math.min(...hotel.rooms.map((r) => r.pricePerNight))
                : 0;
            return (
              <HotelCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                city={hotel.city}
                imageUrl={hotel.imageUrl}
                rating={hotel.rating}
                minPrice={minPrice}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
