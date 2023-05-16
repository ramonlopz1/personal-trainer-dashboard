import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listCodes() {
  const codes = await prisma.raffledCodes.findMany();

  if (!Object.keys(codes || {}).length)
    throw new Error("Códigos não encontrados.");

  return codes;
}
