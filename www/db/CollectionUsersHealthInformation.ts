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
      await this.prisma.usersHealthInformation.findUnique({
        // retorna o usuário e o dados relacionados da tabela raffledCodes
        where: { ownerId: id },
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
      include: {
        descriptions: true,
        fcev02max: true,
        macrociclo: true,
        trainingSessions: true,
        workoutActivity: true
      }
    });

    return healthInfo;
  }
}
