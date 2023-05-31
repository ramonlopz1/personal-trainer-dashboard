import CollectionUser from "@/db/CollectionUsers";
import argon2 from "argon2";
import { IRaffledCode } from "../raffledcodes/ServiceRaffledCodes";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  passwordConfirmation?: string | null;
  birthDate?: string
  phone?: string | null;
  role?: string
  raffledCodes: IRaffledCode[]
}

export interface IServiceUser {
  add: (user: IUser) => Promise<IUser>;
  getOne: (id: string | string[]) => Promise<IUser>;
  list: () => Promise<IUser[]>;
  update: (id: string | string[], user: any) => Promise<IUser>;
}

export default class ServiceUser implements IServiceUser {
  private _collection = new CollectionUser();
  async add(user: IUser) {
    const emailIsUsed = await this._collection.getUserByEmail(user.email);
    const phoneIsUsed = user.phone && await this._collection.getUserByPhone(user.phone);
    if (emailIsUsed) {
      throw new Error("E-mail já cadastrado.");
    } else if (phoneIsUsed) {
      throw new Error("Telefone já cadastrado.");
    }

    return await this._collection.createUser(user)
  }

  async getOne(id: string | string[]) {
    const user = await this._collection.getUserById(id);
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async list() {
    const users = await this._collection.listUsers();
    if (!users) throw new Error("Usuários não encontrados.");
    return users;
  }

  async update(id: string | string[], user: IUser) {
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
