import { PrismaClient, Users } from "@prisma/client";
import argon2 from "argon2";

interface ICollectionUser {
  createUser: (user: Users) => Promise<Users>;
  getUserByEmail: (email: string) => Promise<Users>;
  getUserByPhone: (phone: string) => Promise<Users>;
  getUserById: (id: string) => Promise<Users>;
  getUserOrCreateBySocialId: (payload: any, id: string) => Promise<Users>;
  listUsers: () => Promise<Users[]>;
  listUsersByProvider: (providerId: string) => Promise<Users[]>;
  updateUser: (id: string, user: any) => Promise<Users>;
  getUserByProvider: (id: any, providerId: any) => Promise<Users>;
}

export default class CollectionUser implements ICollectionUser {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createUser(user: Users): Promise<Users> {
    const { password, ...data } = user;
    const randomId = Math.random();

    await this.prisma.users.create({
      data: {
        password: await argon2.hash(password!),
        ...data,
        socialId: randomId.toString(),
      },
    });

    return { ...data, password: "" };
  }

  async getUserByEmail(email: string): Promise<any> {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  async getUserByPhone(phone: string): Promise<any> {
    return await this.prisma.users.findUnique({
      where: { phone },
    });
  }

  async getUserById(id: any): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
      include: {
        healthInformation: {
          where: {
            ownerId: id,
          },
          include: {
            macrociclo: true,
            fcev02max: true,
            trainingSessions: true
          },
        },
      },
    });

    const { password, ...res } = user!;
    return { ...res, password: "" };
  }

  async getUserOrCreateBySocialId(
    payload: Users,
    socialId: any
  ): Promise<Users> {
    let user = await this.prisma.users.findUnique({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { socialId },
      // rejectOnNotFound: false,
    });

    if (!user) {
      user = await this.prisma.users.create({
        data: {
          ...payload,
          password: await argon2.hash(payload.password!),
        },
      });
    }

    const { password, ...res } = user!;
    return { ...res, password: "" };
  }

  async getUserByProvider(id: any, providerId: any): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
      // include: { raffledCodes: { where: { providerId: providerId } } },
    });

    const { password, ...res } = user!;
    return { ...res, password: "" };
  }

  async listUsers(): Promise<Users[]> {
    const users = await this.prisma.users.findMany({
      // include: { raffledCodes: true },
    });

    const res = users.map((user: Users) => {
      const { password, ...rest } = user;
      return { ...rest, password: "" };
    });

    return res;
  }

  async listUsersByProvider(providerId: any): Promise<Users[]> {
    const users = await this.prisma.users.findMany({
      // include: { raffledCodes: { where: { providerId } } },
      // where: { raffledCodes: { some: { providerId } } },
    });

    const res = users.map((user: Users) => {
      const { password, ...rest } = user;
      return { ...rest, password: "" };
    });

    return res;
  }

  async updateUser(id: any, user: any): Promise<Users> {
    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: user,
    });

    const { password, ...res } = updatedUser;
    return { ...res, password: "" };
  }
}
