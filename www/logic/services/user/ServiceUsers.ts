import CollectionUser from "@/db/CollectionUsers";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone: string;
}

export interface IServiceUser {
  add: (user: IUser) => Promise<IUser>
  getOne: (id: string | string[]) => Promise<IUser>
  list: () => Promise<IUser[]>
  update: (id: string | string[], user: any) => Promise<IUser>
}

export default class ServiceUser implements IServiceUser {
  private _collection = new CollectionUser();
  async add(user: IUser) {
    const emailIsUsed = await this._collection.emailIsUsed(user.email);
    const phoneIsUsed = await this._collection.phoneIsUsed(user.phone);
    if (emailIsUsed) {
      throw new Error("E-mail já cadastrado.");
    } else if (phoneIsUsed) {
      throw new Error("Telefone já cadastrado.");
    }

    return this._collection.createUser(user);
  }

  async getOne(id: string | string[]) {
    const user = this._collection.getUserById(id);
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
}
