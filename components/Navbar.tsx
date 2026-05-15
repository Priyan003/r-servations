import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/app/actions/auth";

export default async function Navbar() {
  const session = await getSession();

  return (
    <nav className="bg-white border-b border-rose-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-rose-600">
          LuxHotel
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/hotels" className="text-sm text-dark hover:text-rose-600 font-medium transition-colors">
            Hôtels
          </Link>

          {session ? (
            <>
              {session.role !== "ADMIN" && (
                <Link href="/reservations" className="text-sm text-dark hover:text-rose-600 font-medium transition-colors">
                  Mes réservations
                </Link>
              )}
              {session.role === "ADMIN" && (
                <Link href="/admin" className="text-sm text-dark hover:text-rose-600 font-medium transition-colors">
                  Admin
                </Link>
              )}
              <form action={logout}>
                <button
                  type="submit"
                  className="text-sm bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium px-4 py-2 rounded-full transition-colors"
                >
                  {session.name} · Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-dark hover:text-rose-600 font-medium transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/auth/register"
                className="text-sm bg-rose-600 hover:bg-rose-700 text-white font-medium px-4 py-2 rounded-full transition-colors"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
