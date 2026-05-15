import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [hotelsCount, roomsCount, reservationsCount, revenue] = await Promise.all([
    prisma.hotel.count(),
    prisma.room.count(),
    prisma.reservation.count({ where: { status: { not: "CANCELLED" } } }),
    prisma.reservation.aggregate({
      _sum: { totalPrice: true },
      where: { status: "CONFIRMED" },
    }),
  ]);

  const recentReservations = await prisma.reservation.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true, room: { include: { hotel: true } } },
  });

  const stats = [
    { label: "Hôtels", value: hotelsCount, color: "bg-rose-50 text-rose-600" },
    { label: "Chambres", value: roomsCount, color: "bg-purple-50 text-purple-600" },
    { label: "Réservations actives", value: reservationsCount, color: "bg-blue-50 text-blue-600" },
    { label: "Chiffre d'affaires", value: `${revenue._sum.totalPrice ?? 0}€`, color: "bg-green-50 text-green-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-dark mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl p-6 ${s.color}`}>
            <p className="text-3xl font-extrabold">{s.value}</p>
            <p className="text-sm mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-bold text-dark text-lg mb-4">Dernières réservations</h2>
        {recentReservations.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucune réservation.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Hôtel / Chambre</th>
                  <th className="pb-3 font-medium">Dates</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentReservations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-dark">{r.user.name}</td>
                    <td className="py-3 text-gray-500">{r.room.hotel.name} — {r.room.name}</td>
                    <td className="py-3 text-gray-500">
                      <span className="flex items-center gap-1">
                        {new Date(r.checkIn).toLocaleDateString("fr-FR")}
                        <ArrowRight size={12} />
                        {new Date(r.checkOut).toLocaleDateString("fr-FR")}
                      </span>
                    </td>
                    <td className="py-3 text-rose-600 font-semibold">{r.totalPrice}€</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        r.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                        r.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {r.status === "CONFIRMED" ? "Confirmée" : r.status === "PENDING" ? "En attente" : "Annulée"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
