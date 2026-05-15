"use client";

import { useActionState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = {
  action: (...args: any[]) => any;
  defaultValues: {
    name: string;
    description: string;
    address: string;
    city: string;
    imageUrl: string;
    rating: number;
  };
};

export default function HotelFormClient({ action, defaultValues }: Props) {
  const [state, formAction, isPending] = useActionState(action, {} as { error?: string });

  return (
    <form action={formAction} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {state.error}
        </div>
      )}
      {[
        { name: "name", label: "Nom de l'hôtel", defaultValue: defaultValues.name },
        { name: "city", label: "Ville", defaultValue: defaultValues.city },
        { name: "address", label: "Adresse", defaultValue: defaultValues.address },
        { name: "imageUrl", label: "URL de l'image", defaultValue: defaultValues.imageUrl },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-medium text-dark mb-1">{f.label}</label>
          <input
            name={f.name}
            required
            defaultValue={f.defaultValue}
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
          defaultValue={defaultValues.description}
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
          defaultValue={defaultValues.rating}
          className="w-32 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        {isPending ? "Sauvegarde..." : "Sauvegarder"}
      </button>
    </form>
  );
}
