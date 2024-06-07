import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      include: {
        payment: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        payment: true,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserByRefToken = async (invitationCode: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        invitationCode,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

// export const getPaymentByUserId = async (id: string) => {
//   try {
//     const payment = aw
//   } catch (error) {
//     return null
//   }
// }
