"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createHotel } from "@/app/actions/admin";

export default function NewHotelPage() {
  const [state, action, isPending] = useActionState(createHotel, {} as { error?: string });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/hotels" className="text-gray-400 hover:text-dark text-sm flex items-center gap-1"><ArrowLeft size={14} /> Retour</Link>
        <h1 className="text-3xl font-extrabold text-dark">Nouvel hôtel</h1>
      </div>

      <form action={action} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            {state.error}
          </div>
        )}
        {[
          { name: "name", label: "Nom de l'hôtel", placeholder: "Grand Hôtel de Paris" },
          { name: "city", label: "Ville", placeholder: "Paris" },
          { name: "address", label: "Adresse", placeholder: "12 Rue de la Paix, Paris" },
          { name: "imageUrl", label: "URL de l'image", placeholder: "https://..." },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium text-dark mb-1">{f.label}</label>
            <input
              name={f.name}
              required
              placeholder={f.placeholder}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Note (0-5)</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            defaultValue="4.5"
            className="w-32 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          {isPending ? "Création..." : "Créer l'hôtel"}
        </button>
      </form>
    </div>
  );
}
