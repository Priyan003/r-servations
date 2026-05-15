import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Hotel, BedDouble, CalendarCheck, ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-dark text-white flex flex-col py-8 px-4 min-h-screen">
        <div className="mb-8">
          <p className="text-rose-400 font-bold text-lg">LuxHotel</p>
          <p className="text-gray-400 text-xs mt-1">Administration</p>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
            { href: "/admin/hotels", label: "Hôtels", icon: Hotel },
            { href: "/admin/rooms", label: "Chambres", icon: BedDouble },
            { href: "/admin/reservations", label: "Réservations", icon: CalendarCheck },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2.5"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft size={12} /> Retour au site
        </Link>
      </aside>

      {/* Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
