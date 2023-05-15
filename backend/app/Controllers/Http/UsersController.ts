import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { PrismaClient } from "@prisma/client";
import BadRequestException from "App/Exceptions/BadRequestException";

const prisma = new PrismaClient();

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const { email, phone } = request.only(["email", "phone"]);

    // check if the inserted email already exists
    const checkIfEmailExists = await prisma.user.findUnique({
      where: { email },
    });

    // check if the inserted email already exists
    const checkIfPhoneExists = await prisma.user.findUnique({
      where: { phone },
    });

    if (Object.keys(checkIfEmailExists || {}).length > 0)
      throw new BadRequestException("E-mail já cadastrado.", 404);
    else if (checkIfPhoneExists)
      throw new BadRequestException("Telefone já cadastrado.", 404);

    const post = await prisma.user.create({
      data: request.only(["name", "email", "password", "phone"]),
    });

    return post;
  }

  public async show({ request, params }: HttpContextContract) {
    const { id } = params;

    const get = await prisma.user.findUnique({
      where: { id },
    });
    return get;
  }

  public async index({ request, params }: HttpContextContract) {
    const { id } = params;

    const get = await prisma.user.findMany();

    return get;
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params;

    const get = await prisma.user.update({
      where: { id },
      data: request.only(["name", "email"]),
    });

    return get;
  }

  public async destroy({ request, params }: HttpContextContract) {
    const { id } = params;

    const get = await prisma.user.delete({
      where: { id },
    });

    return get;
  }
}
