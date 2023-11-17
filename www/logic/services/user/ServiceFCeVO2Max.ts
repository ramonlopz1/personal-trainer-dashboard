import CollectionMacrociclo from "@/db/CollectionFCeVO2Max";
import { FCeVO2Max } from "@prisma/client";

export interface IServiceFCeVO2Max {
  add: (data: FCeVO2Max) => Promise<FCeVO2Max>;
}

export default class ServiceFCeVO2Max implements IServiceFCeVO2Max {
  private _collection = new CollectionMacrociclo();

  async add(data: FCeVO2Max) {
    return this._collection.createFCeVO2Max(
      data
    );
  }
}
