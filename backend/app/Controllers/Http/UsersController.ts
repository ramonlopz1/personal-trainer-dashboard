import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default class UsersController {
  public async store({ request }: HttpContextContract) {
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
