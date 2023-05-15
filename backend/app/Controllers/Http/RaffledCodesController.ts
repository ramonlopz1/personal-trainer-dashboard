import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default class RaffledCodesController {
    public async store({ request }: HttpContextContract) {
        const post = await prisma.raffledCodes.create({
          data: request.only(["raffleCode", "owner", "ownerId"]),
        });
    
        return post;
      }
    
      public async show({ request, params }: HttpContextContract) {
        const { id } = params;
    
        const get = await prisma.raffledCodes.findUnique({
          where: { id },
        });
        return get;
      }

      public async showMany({ request, params }: HttpContextContract) {
        const { id } = params;
    
        const get = await prisma.raffledCodes.findMany({
          where: { ownerId: id },
        });
        return get;
      }
    
      public async index({ request, params }: HttpContextContract) {
        const { id } = params;
    
        const get = await prisma.raffledCodes.findMany();
    
        return get;
      }
    
      public async update({ request, params }: HttpContextContract) {
        const { id } = params;
    
        const get = await prisma.raffledCodes.update({
          where: { id },
          data: request.only(["name", "email"]),
        });
    
        return get;
      }
    
      public async destroy({ request, params }: HttpContextContract) {
        const { id } = params;
    
        const get = await prisma.raffledCodes.delete({
          where: { id },
        });
    
        return get;
      }
}
