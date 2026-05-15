import { redirect } from "next/navigation";
import { Hotel as HotelIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { cancelReservation } from "@/app/actions/reservations";

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

export default async function ReservationsPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const reservations = await prisma.reservation.findMany({
    where: { userId: session.userId },
    include: {
      room: { include: { hotel: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-dark mb-2">Mes réservations</h1>
      <p className="text-gray-500 mb-10">{reservations.length} réservation(s)</p>

      {reservations.length === 0 ? (
        <div className="text-center py-20 bg-rose-50 rounded-2xl">
          <HotelIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-semibold text-dark mb-2">Aucune réservation</p>
          <p className="text-gray-500 mb-6">Vous n&apos;avez pas encore effectué de réservation.</p>
          <a
            href="/hotels"
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-full transition-colors inline-block"
          >
            Explorer les hôtels
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map((r) => {
            const nights = Math.ceil(
              (new Date(r.checkOut).getTime() - new Date(r.checkIn).getTime()) /
                (1000 * 60 * 60 * 24)
            );
            return (
              <div key={r.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-dark text-lg">{r.room.hotel.name}</h3>
                      <p className="text-gray-500 text-sm">{r.room.name} — {r.room.hotel.city}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[r.status]}`}>
                      {statusLabels[r.status]}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Arrivée</p>
                      <p className="font-medium text-dark">{new Date(r.checkIn).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Départ</p>
                      <p className="font-medium text-dark">{new Date(r.checkOut).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Durée / Total</p>
                      <p className="font-medium text-dark">{nights} nuit(s) — <span className="text-rose-600">{r.totalPrice}€</span></p>
                    </div>
                  </div>
                </div>
                {r.status === "PENDING" && (
                  <form
                    action={async () => {
                      "use server";
                      await cancelReservation(r.id);
                    }}
                    className="flex items-end"
                  >
                    <button
                      type="submit"
                      className="text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-4 py-2 rounded-lg transition-colors"
                    >
                      Annuler
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
