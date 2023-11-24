import CollectionUsersHealthInformationDescription from "@/db/CollectionUsersHealthInformationDescription";
import { UsersHealthInformationDescriptions } from "@prisma/client";

export interface IServiceUsersHealthInformation {
  add: (data: UsersHealthInformationDescriptions) => Promise<UsersHealthInformationDescriptions>;
}

export default class ServiceUsersHealthInformation implements IServiceUsersHealthInformation {
  private _collection = new CollectionUsersHealthInformationDescription();

  async add(data: UsersHealthInformationDescriptions) {
    return this._collection.createUserDescription(
      data
    );
  }

  async update(id: any, data: any) {
    return this._collection.putUserDescriptionById(id, data);
  }
}
