import { db } from "./db";

export async function generateRefToken(length: number): Promise<string> {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code;
  while (true) {
    code = Array.from(
      { length },
      () => charset[Math.floor(Math.random() * charset.length)]
    ).join("");

    const existingUser = await db.user.findFirst({
      where: { invitationCode: code },
    });

    if (!existingUser) break; // Code is unique
  }
  return code;
}
