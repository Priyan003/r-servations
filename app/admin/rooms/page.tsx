import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteRoom } from "@/app/actions/admin";

const roomTypeLabels: Record<string, string> = {
  SINGLE: "Simple",
  DOUBLE: "Double",
  SUITE: "Suite",
  DELUXE: "Deluxe",
};

export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({
    include: { hotel: true },
    orderBy: { hotel: { name: "asc" } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-dark">Chambres</h1>
        <Link
          href="/admin/rooms/new"
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          + Ajouter une chambre
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-gray-400">
              <th className="px-6 py-4 font-medium">Chambre</th>
              <th className="px-6 py-4 font-medium">Hôtel</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Prix / nuit</th>
              <th className="px-6 py-4 font-medium">Capacité</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-dark">{room.name}</td>
                <td className="px-6 py-4 text-gray-500">{room.hotel.name}</td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                    {roomTypeLabels[room.type] ?? room.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-rose-600 font-semibold">{room.pricePerNight}€</td>
                <td className="px-6 py-4 text-gray-500">{room.capacity} pers.</td>
                <td className="px-6 py-4 flex gap-2">
                  <Link
                    href={`/admin/rooms/${room.id}/edit`}
                    className="text-sm text-dark border border-gray-200 hover:border-rose-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Modifier
                  </Link>
                  <form action={async () => { "use server"; await deleteRoom(room.id); }}>
                    <button
                      type="submit"
                      className="text-sm text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Supprimer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {rooms.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  Aucune chambre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
