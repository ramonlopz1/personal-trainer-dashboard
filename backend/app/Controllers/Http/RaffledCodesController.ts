import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PrismaClient } from '@prisma/client'
import BadRequestException from 'App/Exceptions/BadRequestException'

const prisma = new PrismaClient()

export default class RaffledCodesController {

    // Salva no banco de dados
    public async store({ request, response }: HttpContextContract) {
        const { raffleCode } = request.only(["raffleCode"])
        // check if the inserted code exists
        const checkIfExists = await prisma.raffledCodes.findUnique({
          where: { raffleCode }
        })

        if(Object.keys(checkIfExists || {}).length > 0) throw new BadRequestException('Código já cadastrado.', 404)

        const item = await prisma.raffledCodes.create({
          data: request.only(["raffleCode", "ownerId"]),
        });

        response.status(200).send(item);
      }
    
      // Seleciona no banco de dados
      public async show({ request, params }: HttpContextContract) {
        const { id  } = params;
    
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
    
      // public async update({ request, params }: HttpContextContract) {
      //   const { id } = params;
    
      //   const get = await prisma.raffledCodes.update({
      //     where: { id },
      //     data: request.only(["name", "email"]),
      //   });
    
      //   return get;
      // }
    
      public async destroy({ request, params }: HttpContextContract) {
        const { id } = params;
    
        const get = await prisma.raffledCodes.delete({
          where: { id },
        });
    
        return get;
      }
}
