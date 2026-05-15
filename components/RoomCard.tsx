import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";

const roomTypeLabels: Record<string, string> = {
  SINGLE: "Chambre Simple",
  DOUBLE: "Chambre Double",
  SUITE: "Suite",
  DELUXE: "Chambre Deluxe",
};

type RoomCardProps = {
  id: string;
  name: string;
  type: string;
  pricePerNight: number;
  capacity: number;
  imageUrl: string;
  amenities: string;
};

export default function RoomCard({ id, name, type, pricePerNight, capacity, imageUrl, amenities }: RoomCardProps) {
  const amenityList = amenities.split(",").map((a) => a.trim()).slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-row">
      <div className="relative sm:w-56 h-48 sm:h-auto flex-shrink-0">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                {roomTypeLabels[type] ?? type}
              </span>
              <h3 className="font-bold text-dark text-lg mt-2">{name}</h3>
            </div>
            <p className="text-right shrink-0">
              <span className="text-rose-600 font-bold text-xl">{pricePerNight}€</span>
              <span className="text-gray-400 text-xs block">/ nuit</span>
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-2 flex items-center gap-1.5">
            <Users size={14} /> Jusqu&apos;à {capacity} personnes
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {amenityList.map((a) => (
              <span key={a} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                {a}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={`/reservations/new?roomId=${id}`}
          className="mt-4 inline-block text-center bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors text-sm"
        >
          Réserver cette chambre
        </Link>
      </div>
    </div>
  );
}
