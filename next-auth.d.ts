import { PaymentPlan, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isSubscribed: boolean;
  paymentPlan: PaymentPlan | null;
  referrerId: string;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
