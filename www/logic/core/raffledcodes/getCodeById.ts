import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCodeById(id: any) {
  const code = await prisma.raffledCodes.findUnique({
    // retorna o usuário e o dados relacionados da tabela raffledCodes
    where: { id },
  });

  if (!Object.keys(code || {}).length)
    throw new Error("Código não encontrado");

  return code;
}
