import { PrismaClient, Users, WorkoutActivity } from "@prisma/client";


interface ICollectionWorkoutActivity {}

export default class CollectionWorkoutActivity implements ICollectionWorkoutActivity {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createWorkoutActivity(workoutActivity: WorkoutActivity): Promise<WorkoutActivity> {
    await this.prisma.workoutActivity.create({
      data: workoutActivity,
    });

    if (workoutActivity) return workoutActivity
    else throw new Error("asdasdasd")

  }

  async getWorkoutActivityById(id: any): Promise<WorkoutActivity> {
    const healthInfo = await this.prisma.workoutActivity.findUniqueOrThrow({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { healthInfoId: id },
      // include: { raffledCodes: { where: {
      //   expired: false
      // } } },
    });

    return healthInfo;
  }

  async putWorkoutActivityById(
    id: any,
    data: any
  ): Promise<WorkoutActivity> {
    const workoutActivity = await this.prisma.workoutActivity.update({
      where: { healthInfoId: id },
      data,
    });

    return workoutActivity;
  }
}
