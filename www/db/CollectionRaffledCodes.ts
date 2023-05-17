import { IUser } from "@/logic/core/user/ServiceUsers";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

export default class CollectionRaffledCodes {
  constructor(private readonly prisma = new PrismaClient()) {}

  async activeCode(data: any) {
    const { raffleCode, ownerId } = data;

    const checkIfExists = await this.prisma.raffledCodes.findUnique({
      where: { raffleCode },
    });

    if (Object.keys(checkIfExists || {}).length > 0) {
      throw new Error("Código já cadastrado.");
    }

    const isValidCode = await this.prisma.generatedCodes.findUnique({
      where: { code: raffleCode },
    });

    if (!Object.keys(isValidCode || {}).length) {
      throw new Error("Código inválido.");
    }

    const activedCode = await this.prisma.raffledCodes.create({
      data: {
        raffleCode,
        ownerId,
      },
    });

    return activedCode;
  }

  async listCodes() {
    const codes = await this.prisma.raffledCodes.findMany();

    if (!Object.keys(codes || {}).length)
      throw new Error("Códigos não encontrados.");

    return codes;
  }

  async getCodeById(id: any) {
    const code = await this.prisma.raffledCodes.findUnique({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
    });

    if (!Object.keys(code || {}).length)
      throw new Error("Código não encontrado");

    return code;
  }
}
