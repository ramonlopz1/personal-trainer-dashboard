import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listUsers() {
  const users = await prisma.users.findMany({
    include: { raffledCodes: true },
  });

  if (!Object.keys(users || {}).length)
    throw new Error("Usuários não encontrados.");

  const resp = users.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  return resp;
}
