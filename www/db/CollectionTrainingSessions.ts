import { PrismaClient, Users, TrainingSessions } from "@prisma/client";


interface ICollectionTrainingSessions {}

export default class CollectionMacrociclo implements ICollectionTrainingSessions {
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
      where: { id },
      // include: { raffledCodes: { where: {
      //   expired: false
      // } } },
    });

    return healthInfo;
  }
}
