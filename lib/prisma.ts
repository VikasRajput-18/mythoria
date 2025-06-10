import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter, log: ["error", "warn"] });

if (process.env.NODE_ENV === "development") globalForPrisma.prisma = prisma;

export { prisma };
