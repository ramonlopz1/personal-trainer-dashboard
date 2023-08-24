import CollectionUser from "@/db/CollectionUsers";
import argon2 from "argon2";

import { Role, Users } from "@prisma/client";

export interface IServiceUser {
  add: (user: Users) => Promise<Users>;
  getOne: (
    id: string | string[],
    providerId?: string | string[]
  ) => Promise<Users>;
  getOneOrCreateBySocialId: (
    payload: any,
    socialId?: string | string[]
  ) => Promise<Users>;
  list: () => Promise<Users[]>;
  listByProvider: (providerId: string | string[]) => Promise<Users[]>;
  update: (id: string | string[], user: any) => Promise<Users>;
}

export default class ServiceUser implements IServiceUser {
  private _collection = new CollectionUser();
  
  async add(user: Users) {
    const emailIsUsed = await this._collection.getUserByEmail(user.email);
    const phoneIsUsed =
      user.phone && (await this._collection.getUserByPhone(user.phone));
    if (emailIsUsed) {
      throw new Error("E-mail já cadastrado.");
    } else if (phoneIsUsed) {
      throw new Error("Telefone já cadastrado.");
    }

    return await this._collection.createUser(user);
  }

  async getOne(id: string | string[], providerId?: string | string[]) {
    let user;
    if (!providerId) {
      user = await this._collection.getUserById(id);
    } else {
      user = await this._collection.getUserByProvider(id, providerId);
    }

    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async getOneOrCreateBySocialId(payload: any, socialId?: string | string[]) {
    const user = await this._collection.getUserOrCreateBySocialId(
      payload,
      socialId
    );

    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async list() {
    const users = await this._collection.listUsers();
    if (!users) throw new Error("Usuários não encontrados.");
    return users;
  }

  async listByProvider(providerId: string | string[]) {
    const users = await this._collection.listUsersByProvider(providerId);
    if (!users) throw new Error("Usuários não encontrados.");
    return users;
  }

  async update(id: string | string[], user: Users) {
    const updatedUser = await this._collection.updateUser(id, user);
    if (!updatedUser) throw new Error("Usuário não encontrado");

    return updatedUser;
  }

  async auth(credentials: any) {
    const user = await this._collection.getUserByEmail(credentials.email);
    if (!user) throw new Error("Usuário não encontrado");
    const checkPass = await argon2.verify(user.password, credentials.password);
    if (checkPass) return user;
  }
}
