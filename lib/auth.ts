import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/db";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connect();
        const user = (await User.findOne({ email: credentials.email }).exec()) as (null | {
          _id: { toString(): string };
          name?: string | null;
          email: string;
          image?: string | null;
          password?: string;
        });
        if (!user || !user.password) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: user._id.toString(), name: user.name ?? null, email: user.email, image: user.image ?? null };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      await connect();
      const existing = await User.findOne({ email: user.email }).exec();
      if (!existing) {
        await User.create({ name: user.name, email: user.email, image: user.image });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        (token as Record<string, unknown>).user = {
          name: user.name ?? undefined,
          email: user.email ?? undefined,
          image: (user as { image?: string | null }).image ?? undefined,
        };
      }
      const tokenUser = (token as Record<string, unknown>).user as { email?: string } | undefined;
      const email = tokenUser?.email;
      if (email && email.toLowerCase() === 'geraldgchibanda6025@gmail.com') {
        (token as Record<string, unknown>).role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      const tokenUser = (token as Record<string, unknown>).user as
        | { name?: string; email?: string; image?: string }
        | undefined;
      if (tokenUser && session.user) {
        session.user.name = tokenUser.name ?? null;
        session.user.email = tokenUser.email ?? null;
        session.user.image = tokenUser.image ?? null;
      }
      const role = (token as Record<string, unknown>).role as string | undefined;
      if (role && session.user) {
        (session.user as { role?: string }).role = role;
      }
      return session;
    },
  },
  // Safe fallback to ease local development; set NEXTAUTH_SECRET in production.
  secret: process.env.NEXTAUTH_SECRET || "dev_secret_do_not_use_in_production",
};
