import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const dbPath = dbUrl.replace(/^file:/, "");
const resolvedPath = path.isAbsolute(dbPath)
  ? dbPath
  : path.resolve(process.cwd(), dbPath);
const adapter = new PrismaBetterSqlite3({ url: resolvedPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clean
  await prisma.reservation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.user.deleteMany();

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      name: "Administrateur",
      email: "admin@luxhotel.fr",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Demo user
  const userPassword = await bcrypt.hash("user1234", 12);
  await prisma.user.create({
    data: {
      name: "Sophie Martin",
      email: "sophie@email.fr",
      password: userPassword,
    },
  });

  // Hotel 1 — Paris
  const paris = await prisma.hotel.create({
    data: {
      name: "Le Grand Palais",
      description:
        "Situé au cœur de Paris, Le Grand Palais vous offre une expérience hôtelière unique mêlant élégance classique et confort moderne. À deux pas des Champs-Élysées, nos suites somptueuses surplombent les toits de la ville lumière.",
      address: "15 Avenue des Champs-Élysées",
      city: "Paris",
      imageUrl:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop",
      rating: 4.9,
    },
  });

  await prisma.room.createMany({
    data: [
      {
        hotelId: paris.id,
        name: "Chambre Classique Vue Paris",
        type: "DOUBLE",
        description: "Chambre spacieuse avec vue imprenable sur les toits de Paris. Décoration Haussmannienne raffinée.",
        pricePerNight: 280,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
        amenities: "WiFi, TV 4K, Climatisation, Coffre-fort, Mini-bar",
      },
      {
        hotelId: paris.id,
        name: "Suite Prestige Tour Eiffel",
        type: "SUITE",
        description: "Suite luxueuse avec terrasse privée et vue directe sur la Tour Eiffel. Service de conciergerie 24h/24.",
        pricePerNight: 650,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop",
        amenities: "WiFi, TV 4K, Jacuzzi, Terrasse, Butler, Petit-déjeuner inclus",
      },
      {
        hotelId: paris.id,
        name: "Chambre Deluxe Jardin",
        type: "DELUXE",
        description: "Chambre élégante donnant sur notre jardin intérieur fleuri. Calme absolu en plein Paris.",
        pricePerNight: 390,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop",
        amenities: "WiFi, TV, Climatisation, Baignoire, Produits Hermès",
      },
    ],
  });

  // Hotel 2 — Nice
  const nice = await prisma.hotel.create({
    data: {
      name: "Riviera Palace",
      description:
        "Perché sur les hauteurs de Nice, le Riviera Palace jouit d'une vue panoramique sur la Méditerranée et la Promenade des Anglais. Un havre de paix à la croisée du luxe et de l'authenticité provençale.",
      address: "88 Promenade des Anglais",
      city: "Nice",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
      rating: 4.7,
    },
  });

  await prisma.room.createMany({
    data: [
      {
        hotelId: nice.id,
        name: "Chambre Vue Mer",
        type: "DOUBLE",
        description: "Chambre lumineuse avec balcon face à la mer. Profitez du lever et coucher de soleil sur la Méditerranée.",
        pricePerNight: 220,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop",
        amenities: "WiFi, Climatisation, Balcon, TV, Coffre-fort",
      },
      {
        hotelId: nice.id,
        name: "Suite Côte d'Azur",
        type: "SUITE",
        description: "Suite de 80m² avec piscine privée à débordement et vue à 180° sur la Côte d'Azur.",
        pricePerNight: 580,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop",
        amenities: "WiFi, Piscine privée, Cuisine équipée, Terrasse, Butler, Jacuzzi",
      },
    ],
  });

  // Hotel 3 — Lyon
  const lyon = await prisma.hotel.create({
    data: {
      name: "Hôtel des Lumières",
      description:
        "Au cœur du Vieux-Lyon, classé au patrimoine mondial de l'UNESCO, l'Hôtel des Lumières allie le charme Renaissance de ses bâtisses historiques à un confort contemporain remarquable. À deux pas des célèbres bouchons lyonnais.",
      address: "7 Place Bellecour",
      city: "Lyon",
      imageUrl:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop",
      rating: 4.8,
    },
  });

  await prisma.room.createMany({
    data: [
      {
        hotelId: lyon.id,
        name: "Chambre Renaissance",
        type: "SINGLE",
        description: "Chambre single dans une bâtisse du XVIe siècle. Voûtes en pierre apparentes et mobilier d'époque soigneusement restauré.",
        pricePerNight: 150,
        capacity: 1,
        imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&auto=format&fit=crop",
        amenities: "WiFi, Climatisation, TV, Petit-déjeuner inclus",
      },
      {
        hotelId: lyon.id,
        name: "Chambre Prestige Saône",
        type: "DELUXE",
        description: "Spacieuse chambre avec vue sur les berges de la Saône. Décoration contemporaine dans un cadre historique unique.",
        pricePerNight: 310,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop",
        amenities: "WiFi, TV 4K, Climatisation, Baignoire, Coffre-fort, Mini-bar",
      },
      {
        hotelId: lyon.id,
        name: "Suite Gastronomique",
        type: "SUITE",
        description: "Suite exclusive avec cuisine équipée pour les amateurs de gastronomie lyonnaise. Accès privatif à notre cave à vins.",
        pricePerNight: 490,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&auto=format&fit=crop",
        amenities: "WiFi, Cuisine équipée, Cave à vins, TV, Jacuzzi, Service chef privé",
      },
    ],
  });

  console.log("✅ Seed completed!");
  console.log("\nComptes de démonstration:");
  console.log("  Admin : admin@luxhotel.fr / admin123");
  console.log("  User  : sophie@email.fr / user1234");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
