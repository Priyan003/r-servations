"use client";

import { useActionState } from "react";

type Hotel = { id: string; name: string };
type DefaultValues = {
  hotelId?: string;
  name?: string;
  type?: string;
  description?: string;
  pricePerNight?: number;
  capacity?: number;
  imageUrl?: string;
  amenities?: string;
};

type Props = {
  hotels: Hotel[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => any;
  submitLabel: string;
  defaultValues?: DefaultValues;
};

export default function RoomFormClient({ hotels, action, submitLabel, defaultValues }: Props) {
  const [state, formAction, isPending] = useActionState(action, {} as { error?: string });

  return (
    <form action={formAction} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {state.error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-dark mb-1">Hôtel</label>
        <select
          name="hotelId"
          required
          defaultValue={defaultValues?.hotelId ?? ""}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
        >
          <option value="">Sélectionner un hôtel</option>
          {hotels.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">Nom de la chambre</label>
        <input
          name="name"
          required
          defaultValue={defaultValues?.name ?? ""}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">Type</label>
        <select
          name="type"
          required
          defaultValue={defaultValues?.type ?? "DOUBLE"}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
        >
          <option value="SINGLE">Chambre Simple</option>
          <option value="DOUBLE">Chambre Double</option>
          <option value="SUITE">Suite</option>
          <option value="DELUXE">Chambre Deluxe</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={defaultValues?.description ?? ""}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Prix / nuit (€)</label>
          <input
            name="pricePerNight"
            type="number"
            min="1"
            required
            defaultValue={defaultValues?.pricePerNight ?? ""}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Capacité (personnes)</label>
          <input
            name="capacity"
            type="number"
            min="1"
            required
            defaultValue={defaultValues?.capacity ?? ""}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">URL de l&apos;image</label>
        <input
          name="imageUrl"
          type="url"
          required
          defaultValue={defaultValues?.imageUrl ?? ""}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">
          Équipements <span className="text-gray-400">(séparés par des virgules)</span>
        </label>
        <input
          name="amenities"
          required
          placeholder="WiFi, TV, Climatisation, Mini-bar"
          defaultValue={defaultValues?.amenities ?? ""}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        {isPending ? "En cours..." : submitLabel}
      </button>
    </form>
  );
}
