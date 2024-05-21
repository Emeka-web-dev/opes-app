import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const purchase = async () => {
  const session = await auth();
  const purchase = await db.purchase.findUnique({
    where: {
      userId: session?.user.id,
    },
  });
  return purchase;
};
