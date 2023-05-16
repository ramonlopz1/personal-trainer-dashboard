import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateUser(id: any, user: any) {
  const updatedUser = await prisma.users.update({
    // retorna o usuário e o dados relacionados da tabela raffledCodes
    where: { id },
    data: user
  });

  if (!Object.keys(updatedUser || {}).length) throw new Error("Usuário não encontrado");

  const { password, ...res } = updatedUser;

  return res;
}
