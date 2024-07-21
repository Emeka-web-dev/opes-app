import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session } from "next-auth";
import { db } from "@/lib/db";
import { PaymentPlan, UserRole } from "@prisma/client";
import authConfig from "./auth.config";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-comfirmation";
import { getUserById } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorComfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      const expiration = Math.floor(Date.now() / 1000) + 1 * 60;
      user.customExpiration = expiration;
      return true;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.isSubscribed = !!existingUser.payment;
      token.paymentPlan = existingUser.paymentPlan;
      token.referrerId = existingUser.referredById;
      if (user?.customExpiration) {
        token.expiration = user.customExpiration;
      }
      // token.isTwoFactorEnabled = existingUser?.isTwoFactorEnabled;
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        session.user.isSubscribed = token.isSubscribed as boolean;
        session.user.paymentPlan = token.paymentPlan as PaymentPlan | null;
        session.user.referrerId = token.referrerId as string;
        session.user.customExpiration = token?.expiration as number;
      }
      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
