import { Prisma, PrismaClient } from "@prisma/client";

interface ICollectionGiftCodes {
  countCodes: (body: any) => Promise<number>;
}

export default class CollectionGiftCodes implements ICollectionGiftCodes {
  constructor(private readonly prisma = new PrismaClient()) {}

  public async countCodes(body: any): Promise<number> {
    return await this.prisma.raffledCodes.count({
      where: {
        expired: false,
        ownerId: body.ownerId,
        providerId: body.providerId,
      },
    });
  }

  public async getTenOldestRecords(body: any) {
    const oldestRecords = await this.prisma.raffledCodes.findMany({
      where: {
        ownerId: body.ownerId,
        providerId: body.providerId,
        win: false,
      },
      orderBy: {
        createdAt: Prisma.SortOrder.asc, // Order the records by the 'createdAt' field in ascending order (oldest to newest).
      },
      take: 10, // Limit the result to the specified number of records.
    });

    const tenOldestRecords = oldestRecords.map((record: any) => record.id);

    return tenOldestRecords;
  }

  public async updateGiftCodes(idsToUpdate: any) {
    return await this.prisma.raffledCodes.updateMany({
      where: { id: { in: idsToUpdate } },
      data: {
        win: true,
      },
    });
  }

  public async storeGiftCode(code: any, ownerId: any) {
    return await this.prisma.giftCodes.create({
      data: {
        code,
        ownerId,
      },
    });
  }
}
