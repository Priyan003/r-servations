import { prisma } from "@/lib/prisma";
import { updateReservationStatus } from "@/app/actions/admin";

const statusLabels: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  CANCELLED: "Annulée",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-100 text-gray-500",
};

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: {
      user: true,
      room: { include: { hotel: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-dark mb-8">Réservations</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-gray-400">
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Hôtel / Chambre</th>
              <th className="px-6 py-4 font-medium">Arrivée</th>
              <th className="px-6 py-4 font-medium">Départ</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Statut</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reservations.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-dark">{r.user.name}</p>
                  <p className="text-xs text-gray-400">{r.user.email}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {r.room.hotel.name}
                  <br />
                  <span className="text-xs text-gray-400">{r.room.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{new Date(r.checkIn).toLocaleDateString("fr-FR")}</td>
                <td className="px-6 py-4 text-gray-600">{new Date(r.checkOut).toLocaleDateString("fr-FR")}</td>
                <td className="px-6 py-4 text-rose-600 font-semibold">{r.totalPrice}€</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[r.status]}`}>
                    {statusLabels[r.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {r.status !== "CONFIRMED" && (
                      <form action={async () => { "use server"; await updateReservationStatus(r.id, "CONFIRMED"); }}>
                        <button type="submit" className="text-xs text-green-600 border border-green-200 hover:bg-green-50 px-2 py-1 rounded-lg transition-colors">
                          Confirmer
                        </button>
                      </form>
                    )}
                    {r.status !== "CANCELLED" && (
                      <form action={async () => { "use server"; await updateReservationStatus(r.id, "CANCELLED"); }}>
                        <button type="submit" className="text-xs text-red-500 border border-red-200 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors">
                          Annuler
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  Aucune réservation.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
