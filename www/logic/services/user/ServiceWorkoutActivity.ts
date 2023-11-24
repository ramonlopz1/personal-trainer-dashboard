import CollectionWorkoutActivity from "@/db/CollectionWorkoutActivity";
import { WorkoutActivity } from "@prisma/client";

export interface IServiceWorkoutActivity {
  add: (data: WorkoutActivity) => Promise<WorkoutActivity>;
}

export default class ServiceWorkoutActivity implements IServiceWorkoutActivity {
  private _collection = new CollectionWorkoutActivity();

  async add(data: WorkoutActivity) {
    const element = this._collection.createWorkoutActivity(
      data
    );

    if (element) return element
    else throw new Error("aushduiash")
  
  }

  async update(id: any, data: any) {
    const element = this._collection.putWorkoutActivityById(id, data);
    if(element) return element
    else throw new Error("uahuahuah")
  }
}
