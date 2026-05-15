"use client";

import { useState, useActionState } from "react";
import Image from "next/image";
import { Calendar, Moon, AlertTriangle, Check, Lock, User, Users, ArrowRight } from "lucide-react";
import { createReservation } from "@/app/actions/reservations";

const roomTypeLabels: Record<string, string> = {
  SINGLE: "Chambre Simple",
  DOUBLE: "Chambre Double",
  SUITE: "Suite",
  DELUXE: "Chambre Deluxe",
};

type Room = {
  id: string;
  name: string;
  type: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  imageUrl: string;
  amenities: string;
  hotel: { id: string; name: string; city: string; address: string };
};

export default function ReservationFormClient({
  room,
  userName,
}: {
  room: Room;
  userName: string;
}) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(fmt(tomorrow));
  const [checkOut, setCheckOut] = useState(fmt(dayAfter));
  const [state, action, isPending] = useActionState(
    createReservation,
    {} as { error?: string }
  );

  const nights = (() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    if (!checkIn || !checkOut || d2 <= d1) return 0;
    return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  })();

  const total = nights * room.pricePerNight;
  const amenities = room.amenities.split(",").map((a) => a.trim());

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Colonne gauche : formulaire */}
      <div className="lg:col-span-3 space-y-6">
        {/* Carte chambre */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-rose-100">
          <div className="relative h-48">
            <Image
              src={room.imageUrl}
              alt={room.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-xs font-semibold bg-rose-500 px-2 py-0.5 rounded-full">
                {roomTypeLabels[room.type] ?? room.type}
              </span>
              <h2 className="text-xl font-bold mt-1">{room.name}</h2>
              <p className="text-sm text-rose-200">
                {room.hotel.name} · {room.hotel.city}
              </p>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-4">
              {amenities.map((a) => (
                <span
                  key={a}
                  className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {room.description}
            </p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
              <Users size={14} /> Capacité : jusqu&apos;à {room.capacity} personne
              {room.capacity > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Formulaire dates */}
        <form action={action} className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
          <h3 className="font-bold text-dark text-lg mb-5">Choisir vos dates</h3>
          <input type="hidden" name="roomId" value={room.id} />

          {state.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5 flex items-center gap-2">
              <AlertTriangle size={14} className="shrink-0" /> {state.error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="checkIn"
                className="block text-sm font-medium text-dark mb-2"
              >
                <Calendar size={14} className="inline mr-1.5" /> Date d&apos;arrivée
              </label>
              <input
                id="checkIn"
                name="checkIn"
                type="date"
                required
                min={fmt(tomorrow)}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) {
                    const next = new Date(e.target.value);
                    next.setDate(next.getDate() + 1);
                    setCheckOut(fmt(next));
                  }
                }}
                className="w-full border-2 border-gray-200 hover:border-rose-300 focus:border-rose-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
              />
              {checkIn && (
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(checkIn)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkOut"
                className="block text-sm font-medium text-dark mb-2"
              >
                <Calendar size={14} className="inline mr-1.5" /> Date de départ
              </label>
              <input
                id="checkOut"
                name="checkOut"
                type="date"
                required
                min={checkIn || fmt(tomorrow)}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border-2 border-gray-200 hover:border-rose-300 focus:border-rose-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
              />
              {checkOut && (
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(checkOut)}
                </p>
              )}
            </div>
          </div>

          {/* Barre de durée animée */}
          {nights > 0 && (
            <div className="bg-rose-50 rounded-xl p-4 mb-6 border border-rose-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-dark flex items-center gap-1.5">
                  <Moon size={14} /> {nights} nuit{nights > 1 ? "s" : ""}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  {formatDate(checkIn)} <ArrowRight size={12} /> {formatDate(checkOut)}
                </span>
              </div>
              <div className="w-full bg-rose-200 rounded-full h-1.5">
                <div
                  className="bg-rose-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((nights / 14) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {nights === 0 && checkIn && checkOut && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl px-4 py-3 text-sm mb-5 flex items-center gap-2">
              <AlertTriangle size={14} className="shrink-0" /> La date de départ doit être après la date d&apos;arrivée
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600 space-y-2">
            <p className="flex items-center gap-2">
              <Check size={14} className="text-green-500 shrink-0" /> Annulation gratuite jusqu&apos;à 24h avant l&apos;arrivée
            </p>
            <p className="flex items-center gap-2">
              <Check size={14} className="text-green-500 shrink-0" /> Paiement à l&apos;hôtel
            </p>
            <p className="flex items-center gap-2">
              <Check size={14} className="text-green-500 shrink-0" /> Confirmation instantanée
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending || nights === 0}
            className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 text-base shadow-md hover:shadow-rose-200 active:scale-[0.99]"
          >
            {isPending
              ? "Réservation en cours..."
              : nights > 0
              ? `Confirmer — ${total.toLocaleString("fr-FR")}€`
              : "Choisissez vos dates"}
          </button>
        </form>
      </div>

      {/* Colonne droite : récapitulatif sticky */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 space-y-4">
          {/* Récapitulatif de prix */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
            <h3 className="font-bold text-dark text-lg mb-5">Récapitulatif</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Prix par nuit</span>
                <span className="font-semibold text-dark">
                  {room.pricePerNight}€
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Nombre de nuits</span>
                <span
                  className={`font-semibold transition-all duration-300 ${
                    nights > 0 ? "text-dark" : "text-gray-300"
                  }`}
                >
                  {nights > 0 ? `× ${nights}` : "—"}
                </span>
              </div>

              {checkIn && checkOut && nights > 0 && (
                <>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{formatDate(checkIn)}</span>
                    <ArrowRight size={12} />
                    <span>{formatDate(checkOut)}</span>
                  </div>
                </>
              )}

              <div className="h-px bg-gray-100 my-2" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-dark">Total</span>
                <div className="text-right">
                  <span
                    className={`text-2xl font-extrabold transition-all duration-300 ${
                      nights > 0 ? "text-rose-600" : "text-gray-300"
                    }`}
                  >
                    {nights > 0 ? `${total.toLocaleString("fr-FR")}€` : "—"}
                  </span>
                  {nights > 0 && (
                    <p className="text-xs text-gray-400">toutes taxes incluses</p>
                  )}
                </div>
              </div>
            </div>

            {nights > 0 && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <User size={12} />
                  <span>Réservé au nom de <strong className="text-dark">{userName}</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Détails de prix par nuit */}
          {nights > 1 && (
            <div className="bg-rose-50 rounded-2xl border border-rose-100 p-5">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-3">
                Détail du coût
              </p>
              <div className="space-y-1.5">
                {Array.from({ length: Math.min(nights, 7) }, (_, i) => {
                  const d = new Date(checkIn);
                  d.setDate(d.getDate() + i);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-500">
                        {d.toLocaleDateString("fr-FR", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="text-dark font-medium">
                        {room.pricePerNight}€
                      </span>
                    </div>
                  );
                })}
                {nights > 7 && (
                  <p className="text-xs text-gray-400 text-center pt-1">
                    + {nights - 7} nuit{nights - 7 > 1 ? "s" : ""} supplémentaire{nights - 7 > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Note de sécurité */}
          <div className="text-xs text-gray-400 text-center px-2 flex items-center justify-center gap-1.5">
            <Lock size={12} /> Réservation sécurisée · Paiement à l&apos;hôtel
          </div>
        </div>
      </div>
    </div>
  );
}
