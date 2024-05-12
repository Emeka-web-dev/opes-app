import { db } from "@/lib/db";

export interface Logging {
  id?: string;
  event: string;
  reference: string;
  message?: string;
  createdAt: Date;
}

export async function createLogging(logging: Logging): Promise<void> {
  await db.logging.create({
    data: logging,
  });
}
