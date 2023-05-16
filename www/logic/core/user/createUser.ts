import { Prisma, PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export async function createUser(user: any) {
  const { name, email, password, phone } = user;

  // check if the inserted email already exists
  const checkIfEmailExists = await prisma.users.findUnique({
    where: { email },
  });

  // check if the inserted email already exists
  const checkIfPhoneExists = await prisma.users.findUnique({
    where: { phone },
  });

  if (Object.keys(checkIfEmailExists || {}).length > 0) {
    throw new Error("E-mail já existe.");
  } else if (checkIfPhoneExists) {
    throw new Error("Telefone já existe.");
  }

  const userCreated = await prisma.users.create({
    data: {
      name,
      email,
      password: await argon2.hash(password),
      phone,
    },
  });

  const { password: pass, ...res } = user;

  return userCreated;
}
