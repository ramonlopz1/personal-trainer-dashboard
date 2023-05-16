import { Prisma, PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export async function activeCode(data: any) {
  const { raffleCode, ownerId } = data;

  const checkIfExists = await prisma.raffledCodes.findUnique({
    where: { raffleCode },
  });

   if (Object.keys(checkIfExists || {}).length > 0){
    throw new Error("Código já cadastrado.");
  } 

  const activedCode = await prisma.raffledCodes.create({
    data: {
      raffleCode,
      ownerId
    }
  });

  return activedCode;
}
