import { PrismaClient } from "@prisma/client";

declare global {
  /* eslint-disable-next-line no-var */
  var $$prisma: PrismaClient | undefined;
}

const log: Array<"info" | "query" | "warn" | "error"> = [];

if (!import.meta.env.PROD) {
  log.push("info");
}

if (process.env.DEBUG?.includes("prisma:query")) {
  log.push("query");
}

export const prisma = globalThis.$$prisma || new PrismaClient({ log });

if (process.env.NODE_ENV !== "production") {
  globalThis.$$prisma = prisma;
}
