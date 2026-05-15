# LuxHotel — Site de réservation hôtelière

Application web de réservation d'hôtels construite avec Next.js 16, Prisma 7, SQLite et TailwindCSS v4.

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.2.6 | Framework (App Router) |
| React | 19 | UI |
| Prisma | 7.8 | ORM |
| SQLite + `better-sqlite3` | — | Base de données locale |
| TailwindCSS | v4 | Styles |
| `jose` | v6 | Auth JWT (sessions httpOnly) |
| `bcryptjs` | v3 | Hachage des mots de passe |
| `zod` | v4 | Validation des formulaires |

---

## Lancer le projet

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Le fichier `.env` est déjà présent à la racine avec les valeurs par défaut :

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="hotel-reservation-super-secret-jwt-key-2024"
```

### 3. Migrer la base de données

```bash
npx prisma migrate dev
```

### 4. Insérer les données de démonstration

```bash
npx prisma db seed
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'application est disponible sur **http://localhost:3000**

---

## Comptes de démonstration

> Ces comptes sont créés automatiquement par le seed.

### Administrateur

| Champ | Valeur |
|---|---|
| Email | `admin@luxhotel.fr` |
| Mot de passe | `admin123` |
| Accès | Panneau admin complet (`/admin`) |

### Utilisateur standard

| Champ | Valeur |
|---|---|
| Email | `sophie@email.fr` |
| Mot de passe | `user1234` |
| Accès | Réservations, profil |

---

## Structure des pages

```
/                        → Accueil (hôtels en vedette)
/hotels                  → Liste des hôtels avec filtres
/hotels/[id]             → Détail hôtel + chambres disponibles
/reservations/new        → Formulaire de réservation (calcul prix temps réel)
/reservations            → Mes réservations (annulation possible)
/auth/login              → Connexion
/auth/register           → Inscription
/admin                   → Dashboard admin (stats)
/admin/hotels            → Gestion des hôtels (CRUD)
/admin/rooms             → Gestion des chambres (CRUD)
/admin/reservations      → Toutes les réservations (confirmation/annulation)
```

## Données de démonstration

Le seed crée **3 hôtels** avec **8 chambres** au total :

| Hôtel | Ville | Chambres | Prix |
|---|---|---|---|
| Le Grand Palais | Paris | 3 | 280€ – 650€ / nuit |
| Riviera Palace | Nice | 2 | 220€ – 580€ / nuit |
| Hôtel des Lumières | Lyon | 3 | 150€ – 490€ / nuit |

---

## Commandes utiles

```bash
# Lancer en développement
npm run dev

# Build de production
npm run build

# Réinitialiser et re-seeder la base
npx prisma migrate reset

# Ouvrir Prisma Studio (interface visuelle DB)
npx prisma studio

# Vérifier les types TypeScript
npx tsc --noEmit
```
