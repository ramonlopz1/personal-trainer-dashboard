import CollectionRaffledCodes from "@/db/CollectionRaffledCodes";
import { GeneratedCodes, RaffledCodes } from "@prisma/client";

export interface IServiceRaffledCodes {
  active: (data: RaffledCodes) => Promise<RaffledCodes>;
  list: () => Promise<RaffledCodes[]>;
  listByProvider: (providerId: string) => Promise<GeneratedCodes[]>;
  deleteAll: (ownerId: string) => any;
}

export default class ServiceRaffledCodes implements IServiceRaffledCodes {
  private _collection = new CollectionRaffledCodes();

  async active(data: RaffledCodes) {
    const { raffleCode } = data;
    const isActive = await this._collection.isActive(raffleCode);
    const isValidCode = await this._collection.isValidCode(raffleCode);

    if (isActive) {
      throw new Error("Código informado já foi ativado.");
    } else if (!isValidCode) {
      throw new Error("Código inválido.");
    }

    return this._collection.activateCode({
      ...data,
      provider: isValidCode.provider,
      providerId: isValidCode.providerId,
    });
  }

  async list() {
    const codes = await this._collection.listCodes();
    if (!Object.keys(codes || {}).length)
      throw new Error("Códigos não encontrados.");
    return codes;
  }

  async listByProvider(providerId: string) {
    const codes = await this._collection.listCodesByProviderId(providerId);
    if (!Object.keys(codes || {}).length)
      throw new Error("Códigos não encontrados.");
    return codes;
  }

  async deleteAll(ownerId: string) {
    return await this._collection.deleteAll(ownerId);
  }
}
