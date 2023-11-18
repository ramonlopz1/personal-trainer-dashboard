import { PrismaClient, Users, UsersHealthInformation } from "@prisma/client";
import argon2 from "argon2";

interface IUsersHealthInformation {}

export default class CollectionUsersHealthInformation
  implements IUsersHealthInformation
{
  constructor(private readonly prisma = new PrismaClient()) {}

  async createUsersHealthInformation(
    healthInfo: UsersHealthInformation
  ): Promise<UsersHealthInformation> {
    await this.prisma.usersHealthInformation.create({
      data: healthInfo,
    });

    return healthInfo;
  }

  async getUsersHealthInformationById(
    id: any
  ): Promise<UsersHealthInformation> {
    const healthInfo =
      await this.prisma.usersHealthInformation.findUniqueOrThrow({
        // retorna o usuário e o dados relacionados da tabela raffledCodes
        where: { id },
        // include: { raffledCodes: { where: {
        //   expired: false
        // } } },
      });

    return healthInfo;
  }

  async putUsersHealthInformationById(
    id: any,
    data: any
  ): Promise<UsersHealthInformation> {
    const healthInfo = await this.prisma.usersHealthInformation.update({
      where: { ownerId: id },
      data,
    });

    return healthInfo;
  }
}
