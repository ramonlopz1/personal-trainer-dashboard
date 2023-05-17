import CollectionUser from "@/db/CollectionUsers";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default class ServiceUser {
  private _collection = new CollectionUser();
  async add(user: IUser) {
    return this._collection.createUser(user);
  }

  async getOne(id: any) {
    return this._collection.getUserById(id)
  }

  async list() {
    return this._collection.listUsers()
  }

  async update(id: any, user: IUser) {
    return this._collection.updateUser(id, user) 
  }
}
