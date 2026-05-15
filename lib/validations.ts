import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const reservationSchema = z.object({
  roomId: z.string().min(1, "Chambre requise"),
  checkIn: z.string().min(1, "Date d'arrivée requise"),
  checkOut: z.string().min(1, "Date de départ requise"),
});

export const hotelSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  description: z.string().min(10, "Description requise"),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  imageUrl: z.string().url("URL d'image invalide"),
  rating: z.number().min(0).max(5),
});

export const roomSchema = z.object({
  hotelId: z.string().min(1, "Hôtel requis"),
  name: z.string().min(2, "Nom requis"),
  type: z.enum(["SINGLE", "DOUBLE", "SUITE", "DELUXE"]),
  description: z.string().min(10, "Description requise"),
  pricePerNight: z.number().positive("Prix invalide"),
  capacity: z.number().int().positive("Capacité invalide"),
  imageUrl: z.string().url("URL d'image invalide"),
  amenities: z.string().min(1, "Équipements requis"),
});
