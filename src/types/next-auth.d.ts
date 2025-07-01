import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extiende la sesión para incluir id y role
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    role?: string;
  }
}
