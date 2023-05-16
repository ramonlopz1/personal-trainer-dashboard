import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserById(id: any) {
  const user = await prisma.users.findUnique({
    // retorna o usuário e o dados relacionados da tabela raffledCodes
    where: { id },
    include: { raffledCodes: true },
  });

  if (!Object.keys(user || {}).length) throw new Error("Usuário não encontrado");

  const { password, ...res } = user;

  return res;
}
