import CollectionUser from "@/db/CollectionUsers";
import argon2 from "argon2";

import { Role, Users } from "@prisma/client";
import CollectionUsersHealthInformation from "@/db/CollectionUsersHealthInformation";

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
  private _userCollection = new CollectionUser();
  private _healthInformationCollection = new CollectionUsersHealthInformation();

  async add(user: Users) {
    const emailIsUsed = await this._userCollection.getUserByEmail(user.email);
    const phoneIsUsed =
      user.phone && (await this._userCollection.getUserByPhone(user.phone));
    if (emailIsUsed) {
      throw new Error("E-mail já cadastrado.");
    } else if (phoneIsUsed) {
      throw new Error("Telefone já cadastrado.");
    }

    return await this._userCollection.createUser(user);
  }

  async getOne(id: string | string[], providerId?: string | string[]) {
    let user;
    if (!providerId) {
      user = await this._userCollection.getUserById(id);
    } else {
      user = await this._userCollection.getUserByProvider(id, providerId);
    }

    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async getOneOrCreateBySocialId(payload: any, socialId?: string | string[]) {
    const user = await this._userCollection.getUserOrCreateBySocialId(
      payload,
      socialId
    );

    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async list() {
    const users = await this._userCollection.listUsers();
    if (!users) throw new Error("Usuários não encontrados.");
    return users;
  }

  async listByProvider(providerId: string | string[]) {
    const users = await this._userCollection.listUsersByProvider(providerId);
    if (!users) throw new Error("Usuários não encontrados.");
    return users;
  }

  async update(id: string | string[], user: Users) {
    const checkHealthInformation =
      await this._healthInformationCollection.getUsersHealthInformationById(id);

    const updatedUser = await this._userCollection.updateUser(id, user);

    if (!updatedUser) throw new Error("Usuário não encontrado");

    return updatedUser;
  }

  async auth(credentials: any) {
    const user = await this._userCollection.getUserByEmail(credentials.email);
    if (!user) throw new Error("Usuário não encontrado");
    const checkPass = await argon2.verify(user.password, credentials.password);
    if (checkPass) return user;
  }
}
