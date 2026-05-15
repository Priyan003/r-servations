import Link from "next/link";
import { Hotel as HotelIcon, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import HotelCard from "@/components/HotelCard";

export default async function HomePage() {
  const hotels = await prisma.hotel.findMany({
    include: { rooms: { select: { pricePerNight: true } } },
    orderBy: { rating: "desc" },
    take: 6,
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-rose-100 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-dark leading-tight">
            Votre séjour de{" "}
            <span className="text-rose-600">prestige</span>
            <br />vous attend
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Découvrez une sélection d&apos;hôtels d&apos;exception à travers la France.
            Réservez en quelques clics.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/hotels"
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors shadow-md"
            >
              Explorer les hôtels
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-rose-600 py-12">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center text-white">
          <div>
            <p className="text-4xl font-extrabold">50+</p>
            <p className="text-rose-200 mt-1">Hôtels partenaires</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">10k+</p>
            <p className="text-rose-200 mt-1">Clients satisfaits</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">4.9</p>
            <p className="text-rose-200 mt-1">Note moyenne</p>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-dark">Hôtels en vedette</h2>
            <p className="text-gray-500 mt-2">Nos établissements les mieux notés</p>
          </div>
          <Link href="/hotels" className="text-rose-600 font-medium hover:underline text-sm flex items-center gap-1">
            Voir tous <ArrowRight size={14} />
          </Link>
        </div>

        {hotels.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <HotelIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p>Aucun hôtel disponible pour le moment.</p>
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
      </section>

      {/* CTA */}
      <section className="bg-rose-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-dark">Prêt à voyager ?</h2>
          <p className="text-gray-500 mt-4 mb-8">
            Réservez votre chambre en quelques minutes et profitez d&apos;un séjour inoubliable.
          </p>
          <Link
            href="/hotels"
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-10 py-4 rounded-full text-lg transition-colors shadow-md inline-block"
          >
            Réserver maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}
