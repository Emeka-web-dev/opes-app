import { PaymentPlan, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession, type User } from "next-auth";

export type ExtendedUser =
  | DefaultSession["user"] & {
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isSubscribed: boolean;
      paymentPlan: PaymentPlan | null;
      referrerId: string;
      expiration?: number;
      invitationCode: string;
      // customExpiration?: string;
    };
declare module "next-auth" {
  interface Session {
    user?: ExtendedUser;
  }
  interface User {
    customExpiration?: number;
  }
}
