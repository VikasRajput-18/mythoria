import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

console.log("--process.env.DATABASE_URL", process.env.DATABASE_URL);

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter, log: ["query", "error", "warn"] });

if (process.env.NODE_ENV === "development") globalForPrisma.prisma = prisma;

export default prisma;
