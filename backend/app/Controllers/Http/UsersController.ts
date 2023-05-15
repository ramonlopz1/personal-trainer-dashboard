import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { prisma } from "@ioc:Adonis/Addons/Prisma";

export default class UsersController {
  private userDB = prisma.post

  public async store({ request }: HttpContextContract) {
    const post = await this.userDB.create({
      data: request.only(["title", "content"]),
    });

    return post;
  }

  public async show({ request, params }: HttpContextContract) {
    const { id } = params

    const get = await this.userDB.findUnique({
        where: { id }
    });
    return get;
  }

  public async index({ request, params }: HttpContextContract) {
    const { id } = params

    const get = await this.userDB.findMany();

    return get;
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params

    const get = await this.userDB.update({
        where: { id },
        data: request.only(['name', 'email'])
    });

    return get;
  }

  public async destroy({ request, params }: HttpContextContract) {
    const { id } = params

    const get = await prisma.post.delete({
        where: { id },
    });

    return get;
  }
}
