import NextAuth, { NextAuthOptions } from "next-auth";
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
        const user: any = await User.findOne({ email: credentials.email }).exec();
        if (!user || !user.password) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return { id: user._id.toString(), name: user.name, email: user.email, image: user.image } as any;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) return false;
      await connect();
      const existing: any = await User.findOne({ email: user.email }).exec();
      if (!existing) {
        await User.create({ name: user.name, email: user.email, image: user.image });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.user = { name: user.name, email: user.email, image: (user as any).image } as any;
      const email = (token.user as any)?.email as string | undefined;
      if (email && email.toLowerCase() === 'geraldgchibanda6025@gmail.com') {
        (token as any).role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user && session.user) {
        session.user.name = (token.user as any).name;
        session.user.email = (token.user as any).email;
        session.user.image = (token.user as any).image;
      }
      if ((token as any)?.role && session.user) {
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
  // Safe fallback to ease local development; set NEXTAUTH_SECRET in production.
  secret: process.env.NEXTAUTH_SECRET || "dev_secret_do_not_use_in_production",
};
