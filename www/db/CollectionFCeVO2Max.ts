import { PrismaClient, Users, FCeVO2Max } from "@prisma/client";
import argon2 from "argon2";

interface ICollectionFCeVO2Max {}

export default class CollectionFCeVO2Max implements ICollectionFCeVO2Max {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createFCeVO2Max(fCeVO2MaxInfo: FCeVO2Max): Promise<FCeVO2Max> {
    await this.prisma.fCeVO2Max.create({
     data: fCeVO2MaxInfo
    });

    return fCeVO2MaxInfo;
  }

  async getFCeVO2MaxById(id: any): Promise<FCeVO2Max> {
    const healthInfo = await this.prisma.fCeVO2Max.findUniqueOrThrow({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
         where: { healthInfoId: id },
      // include: { raffledCodes: { where: {
      //   expired: false
      // } } },
    });

    return healthInfo;
  }

  async putFCeVO2MaxById(
    id: any,
    data: any
  ): Promise<FCeVO2Max> {
    const fcevo2max = await this.prisma.fCeVO2Max.update({
         where: { healthInfoId: id },
      data,
    });

    return fcevo2max;
  }
}
