import { PrismaClient, RaffledCodes } from "@prisma/client";

interface ICollectionRaffledCodes {
  activateCode: (data: RaffledCodes) => Promise<RaffledCodes>;
  isActive: (code: string) => Promise<any>;
  isValidCode: (code: string) => Promise<any>;
  listCodes: () => Promise<RaffledCodes[]>;
}

export default class CollectionRaffledCodes implements ICollectionRaffledCodes {
  constructor(private readonly prisma = new PrismaClient()) {}

  async activateCode(data: any): Promise<RaffledCodes> {
    await this.prisma.generatedCodes.update({
      where: { code: data.raffleCode },
      data: {
        isActive: true,
        ownerId: data.ownerId,
        activationDate: new Date().toJSON(),
      },
    });

    return await this.prisma.raffledCodes.create({
      data: {
        raffleCode: data.raffleCode,
        ownerId: data.ownerId,
        provider: data.provider,
        providerId: data.providerId,
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

  async listCodes(): Promise<RaffledCodes[]> {
    return await this.prisma.raffledCodes.findMany({
      include: {
        owner: true,
      },
    });
  }

  async deleteAll(ownerId: any) {
    return await this.prisma.raffledCodes.deleteMany({
      where: { ownerId },
    });
  }

  async listCodesByProviderId(providerId: any) {
    return await this.prisma.generatedCodes.findMany({
      where: { providerId },
      take: 15,
      orderBy: { createdAt: "desc" },
    });
  }
}
