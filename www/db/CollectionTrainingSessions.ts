import { PrismaClient, Users, TrainingSessions } from "@prisma/client";


interface ICollectionTrainingSessions {}

export default class CollectionTrainingSessions implements ICollectionTrainingSessions {
  constructor(private readonly prisma = new PrismaClient()) {}

  async createTrainingSessions(trainingSessions: TrainingSessions): Promise<TrainingSessions> {
    await this.prisma.trainingSessions.create({
      data: trainingSessions,
    });

    return trainingSessions;
  }

  async getTrainingSessionsById(id: any): Promise<TrainingSessions> {
    const healthInfo = await this.prisma.trainingSessions.findUniqueOrThrow({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { healthInfoId: id },
      // include: { raffledCodes: { where: {
      //   expired: false
      // } } },
    });

    return healthInfo;
  }

  async putTrainingSessionsById(
    id: any,
    data: any
  ): Promise<TrainingSessions> {
    const trainingSessions = await this.prisma.trainingSessions.update({
      where: { healthInfoId: id },
      data,
    });

    return trainingSessions;
  }
}
