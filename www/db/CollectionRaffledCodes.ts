import { PrismaClient } from "@prisma/client";
import { IRaffledCode } from "@/logic/services/raffledcodes/ServiceRaffledCodes";

interface ICollectionRaffledCodes {
  activateCode: (data: IRaffledCode) => Promise<IRaffledCode>;
  isActive: (code: string) => Promise<any>;
  isValidCode: (code: string) => Promise<any>;
  listCodes: () => Promise<IRaffledCode[]>;
}

export default class CollectionRaffledCodes implements ICollectionRaffledCodes {
  constructor(private readonly prisma = new PrismaClient()) {}

  async activateCode(data: any): Promise<IRaffledCode> {
    return await this.prisma.raffledCodes.create({
      data: {
        raffleCode: data.raffleCode,
        ownerId: data.ownerId,
      },
    });
  }

  async isActive(code: string): Promise<any> {
    return await this.prisma.raffledCodes.findUnique({
      where: { raffleCode: code },
    });
  }

  async isValidCode(code: string): Promise<any> {
    return await this.prisma.generatedCodes.findUnique({
      where: { code },
    });
  }

  async listCodes(): Promise<IRaffledCode[]> {
    return await this.prisma.raffledCodes.findMany();
  }
}