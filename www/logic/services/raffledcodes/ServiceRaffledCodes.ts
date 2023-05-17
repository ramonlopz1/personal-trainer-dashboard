import CollectionRaffledCodes from "@/db/CollectionRaffledCodes";

export interface IRaffledCode {
  data: string;
}

export default class ServiceRaffledCodes {
  private _collection = new CollectionRaffledCodes();
  async active(data: IRaffledCode) {
    return this._collection.activeCode(data);
  }

  async get(id: any) {
    return this._collection.getCodeById(id)
  }

  async list() {
    return this._collection.listCodes()
  }
}
