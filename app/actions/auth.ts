"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations";

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function register(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = registerSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const existing = await prisma.user.findUnique({ where: { email: raw.email } });
  if (existing) {
    return { error: "Un compte existe déjà avec cet email" };
  }

  const hashedPassword = await bcrypt.hash(raw.password, 12);
  const user = await prisma.user.create({
    data: {
      name: raw.name,
      email: raw.email,
      password: hashedPassword,
    },
  });

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/");
}

export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const user = await prisma.user.findUnique({ where: { email: raw.email } });
  if (!user) {
    return { error: "Email ou mot de passe incorrect" };
  }

  const valid = await bcrypt.compare(raw.password, user.password);
  if (!valid) {
    return { error: "Email ou mot de passe incorrect" };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/");
}
