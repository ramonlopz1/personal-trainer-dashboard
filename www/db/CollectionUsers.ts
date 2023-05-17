import { IUser } from "@/logic/core/user/ServiceUsers";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

export default class UserCollection {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createUser(user: IUser) {
    const { name, email, password, phone } = user;

    const checkIfEmailExists = await this.prisma.users.findUnique({
      where: { email },
    });

    const checkIfPhoneExists = await this.prisma.users.findUnique({
      where: { phone },
    });

    if (Object.keys(checkIfEmailExists || {}).length > 0) {
      throw new Error("E-mail já existe.");
    } else if (checkIfPhoneExists) {
      throw new Error("Telefone já existe.");
    }

    const userCreated = await this.prisma.users.create({
      data: {
        name,
        email,
        password: await argon2.hash(password),
        phone,
      },
    });

    const { password: pass, ...res } = userCreated;

    return res;
  }

  async getUserById(id: any) {
    const user = await this.prisma.users.findUnique({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
      include: { raffledCodes: true },
    });

    if (!Object.keys(user || {}).length)
      throw new Error("Usuário não encontrado");

    const { password, ...res } = user;

    return res;
  }

  async listUsers() {
    const users = await this.prisma.users.findMany({
      include: { raffledCodes: true },
    });

    if (!Object.keys(users || {}).length)
      throw new Error("Usuários não encontrados.");

    const resp = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return resp;
  }

  async updateUser(id: any, user: any) {
    const updatedUser = await this.prisma.users.update({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
      data: user,
    });

    if (!Object.keys(updatedUser || {}).length)
      throw new Error("Usuário não encontrado");

    const { password, ...res } = updatedUser;

    return res;
  }
}
