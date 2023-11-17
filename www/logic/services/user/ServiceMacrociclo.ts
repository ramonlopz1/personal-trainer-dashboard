import CollectionMacrociclo from "@/db/CollectionMacrociclo";
import { Macrociclo } from "@prisma/client";

export interface IServiceUsersHealthInformation {
  add: (data: Macrociclo) => Promise<Macrociclo>;
}

export default class ServiceUsersHealthInformation implements IServiceUsersHealthInformation {
  private _collection = new CollectionMacrociclo();

  async add(data: Macrociclo) {
    return this._collection.createMacrociclo(
      data
    );
  }
}
