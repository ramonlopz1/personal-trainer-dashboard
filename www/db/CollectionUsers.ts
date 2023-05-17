import { IUser } from "@/logic/services/user/ServiceUsers";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

interface ICollectionUser {
  createUser: (user: IUser) => Promise<IUser>;
  emailIsUsed: (email: string) => Promise<IUser>;
  phoneIsUsed: (phone: string) => Promise<IUser>;
  getUserById: (id: string) => Promise<IUser>;
  listUsers: () => Promise<IUser[]>;
  updateUser: (id: string, user: any) => Promise<IUser>;
}

export default class CollectionUser implements ICollectionUser {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createUser(user: IUser): Promise<IUser> {
    const { password, ...data } = user;

    await this.prisma.users.create({
      data: {
        password: await argon2.hash(password!),
        ...data,
      },
    });

    return data;
  }

  async emailIsUsed(email: string): Promise<any> {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  async phoneIsUsed(phone: string): Promise<any> {
    return await this.prisma.users.findUnique({
      where: { phone },
    });
  }

  async getUserById(id: any): Promise<IUser> {
    const user = await this.prisma.users.findUnique({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
      include: { raffledCodes: true },
    });

    const { password, ...res } = user!;
    return res;
  }

  async listUsers(): Promise<IUser[]> {
    const users = await this.prisma.users.findMany({
      include: { raffledCodes: true },
    });

    const resp = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return resp;
  }

  async updateUser(id: any, user: any): Promise<IUser> {
    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: user,
    });

    const { password, ...res } = updatedUser;
    return res;
  }
}
