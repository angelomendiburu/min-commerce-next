import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si hay un usuario (primer login), actualiza el token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      } else if (token?.email) {
        // Siempre consulta el rol actualizado en la base de datos
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, role: true, email: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.email = dbUser.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider && user?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (existingUser && existingUser.id !== user.id) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {
              userId: existingUser.id,
            },
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              token_type: account.token_type,
              id_token: account.id_token,
              refresh_token: account.refresh_token,
              scope: account.scope,
              expires_at: account.expires_at,
              session_state: account.session_state,
            },
          });
          // Registrar login para account linking
          await prisma.userActionLog.create({
            data: {
              userId: existingUser.id,
              action: "login",
              details: `Account linking via ${account.provider}`,
            },
          });
          return true;
        }
      }
      // Registrar login normal
      if (user?.id) {
        await prisma.userActionLog.create({
          data: {
            userId: user.id,
            action: "login",
            details: `Login via ${account?.provider || "credentials"}`,
          },
        });
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return "/catalog";
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
