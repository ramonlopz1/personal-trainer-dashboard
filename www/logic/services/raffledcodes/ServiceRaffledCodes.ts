import CollectionRaffledCodes from "@/db/CollectionRaffledCodes";

export interface IRaffledCode {
  raffleCode: string;
  ownerId: string;
  createdBy: string
}

export interface IServiceRaffledCodes {
  active: (data: IRaffledCode) => Promise<IRaffledCode>;
  list: () => Promise<IRaffledCode[]>;
}

export default class ServiceRaffledCodes implements IServiceRaffledCodes {
  private _collection = new CollectionRaffledCodes();

  async active(data: IRaffledCode) {
    const { raffleCode } = data;
    console.log("service: ", raffleCode);
    const isActive = await this._collection.isActive(raffleCode);
    const isValidCode = await this._collection.isValidCode(raffleCode);
    if (isActive) {
      throw new Error("Código informado já foi ativado.");
    } else if (!isValidCode) {
      throw new Error("Código inválido.");
    }

    return this._collection.activateCode({
      ...data,
      createdBy: isValidCode.createdBy,
    });
  }

  async list() {
    const codes = await this._collection.listCodes();
    if (!Object.keys(codes || {}).length)
      throw new Error("Códigos não encontrados.");
    return codes;
  }
}
