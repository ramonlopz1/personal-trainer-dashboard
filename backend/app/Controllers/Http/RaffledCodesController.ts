import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { PrismaClient } from "@prisma/client";
import BadRequestException from "App/Exceptions/BadRequestException";

const prisma = new PrismaClient();

export default class RaffledCodesController {
  // Salva no banco de dados
  public async store({ request, response }: HttpContextContract) {
    const { raffleCode } = request.only(["raffleCode"]);
    // check if the inserted code exists
    const checkIfExists = await prisma.raffledCodes.findUnique({
      where: { raffleCode },
    });

    if (Object.keys(checkIfExists || {}).length > 0)
      throw new BadRequestException("Código já cadastrado.", 404);

    const item = await prisma.raffledCodes.create({
      data: request.only(["raffleCode", "ownerId"]),
    });

    response.status(200).json(item);
  }

  // Seleciona no banco de dados
  public async show({ response, params }: HttpContextContract) {
    const { id } = params;

    const raffledCode = await prisma.raffledCodes.findUnique({
      where: { id },
    });

    if(!Object.keys(raffledCode || {}).length) throw new BadRequestException("Código não encontrado.", 404)

    response.status(200).json({ raffledCode });
  }

  public async showById({ response, params }: HttpContextContract) {
    const { id } = params;

    const raffledCodes = await prisma.raffledCodes.findMany({
      where: { ownerId: id },
    });

    if(!Object.keys(raffledCodes || {}).length) throw new BadRequestException("Códigos não encontrado.", 500)

    response.status(200).json({ raffledCodes })
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
