import { PrismaClient, Users, Macrociclo } from "@prisma/client";
import argon2 from "argon2";

interface ICollectionMacrociclo {}

export default class CollectionMacrociclo implements ICollectionMacrociclo {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createMacrociclo(macrocicloInfo: Macrociclo): Promise<Macrociclo> {
    await this.prisma.macrociclo.create({
      data: macrocicloInfo,
    });

    return macrocicloInfo;
  }

  async getMacrocicloById(id: any): Promise<Macrociclo> {
    const healthInfo = await this.prisma.macrociclo.findUniqueOrThrow({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
      // include: { raffledCodes: { where: {
      //   expired: false
      // } } },
    });

    return healthInfo;
  }
}
