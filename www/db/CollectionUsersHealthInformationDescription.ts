import { PrismaClient, Users, UsersHealthInformationDescriptions } from "@prisma/client";
import argon2 from "argon2";

interface IUsersHealthInformationDescriptions {}

export default class CollectionUsersHealthInformationDescriptions implements IUsersHealthInformationDescriptions {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createUserDescription(InformationDescription: UsersHealthInformationDescriptions): Promise<UsersHealthInformationDescriptions> {
    await this.prisma.usersHealthInformationDescriptions.create({
      data: InformationDescription,
    });

    return InformationDescription;
  }

  async getUserDescriptionById(id: any): Promise<UsersHealthInformationDescriptions> {
    const healthInfo = await this.prisma.usersHealthInformationDescriptions.findUniqueOrThrow({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { healthInfoId: id },
      // include: { raffledCodes: { where: {
      //   expired: false
      // } } },
    });

    return healthInfo;
  }

  async putUserDescriptionById(
    id: any,
    data: any
  ): Promise<UsersHealthInformationDescriptions> {
    const healthDescriptions = await this.prisma.usersHealthInformationDescriptions.update({
      where: { healthInfoId: id },
      data,
    });

    return healthDescriptions;
  }
}
