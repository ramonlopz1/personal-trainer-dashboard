import CollectionTrainingSessions from "@/db/CollectionTrainingSessions";
import { TrainingSessions } from "@prisma/client";

export interface IServiceTrainingSessions {
  add: (data: TrainingSessions) => Promise<TrainingSessions>;
}

export default class ServiceTrainingSessions implements IServiceTrainingSessions {
  private _collection = new CollectionTrainingSessions();

  async add(data: TrainingSessions) {
    return this._collection.createTrainingSessions(
      data
    );
  }
}
