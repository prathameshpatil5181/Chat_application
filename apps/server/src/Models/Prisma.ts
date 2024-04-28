import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient({
  log: ["query"],
});

export default Prisma;
