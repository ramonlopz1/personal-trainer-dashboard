import CollectionUsersHealthInformation from "@/db/CollectionUsersHealthInformation";
import { UsersHealthInformation } from "@prisma/client";

export interface IServiceUsersHealthInformation {
  add: (data: UsersHealthInformation) => Promise<UsersHealthInformation>;
}

export default class ServiceUsersHealthInformation implements IServiceUsersHealthInformation {
  private _collection = new CollectionUsersHealthInformation();

  async add(data: UsersHealthInformation) {
    return this._collection.createUsersHealthInformation(
      data
    );
  }
}
