import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
// import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import github from "next-auth/providers/github";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
// import { UserRole } from "@prisma/client";
// import { getTwoFactorConfirmationByUserId } from "./data/two-factor-comfirmation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (user.id) {
        const existingUser = await getUserById(user.id);
        if (!existingUser?.emailVerified) return false;

        //TODO: add 2FA check
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser?.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
