import CollectionGiftCodes from "@/db/CollectionGiftCodes";
import { v4 as uuid } from "uuid";

interface IServiceGiftCodes {}

export default class ServiceGiftCodes implements IServiceGiftCodes {
  constructor(private readonly _collection = new CollectionGiftCodes()) {}

  public async activateGiftCode(body: any) {
    const checkActivatedCodesQty = await this._collection.countCodes(body);

    if (checkActivatedCodesQty >= 10) {
      const checkActivatedCodesValidity =
        await this._collection.getTenOldestRecords(body);

      if (checkActivatedCodesValidity) {
        await this._collection.updateGiftCodes(checkActivatedCodesValidity);
        const code = uuid().split("-")[0].toUpperCase();

        return await this._collection.storeGiftCode(code, body.ownerId);
      }
    } else {
      throw new Error("Você precisa ter pelo menos 10 códigos ativos");
    }
  }
}
