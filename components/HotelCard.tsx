import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";

type HotelCardProps = {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
  rating: number;
  minPrice: number;
};

export default function HotelCard({ id, name, city, imageUrl, rating, minPrice }: HotelCardProps) {
  return (
    <Link href={`/hotels/${id}`} className="group block bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-shadow">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold text-dark">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-dark text-lg leading-tight">{name}</h3>
        <p className="text-gray-500 text-sm mt-1">{city}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-rose-600 font-bold text-lg">
            À partir de {minPrice}€
            <span className="text-gray-400 font-normal text-xs ml-1">/ nuit</span>
          </p>
          <span className="text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full font-medium flex items-center gap-1">
            Voir les chambres <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
