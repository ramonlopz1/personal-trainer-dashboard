import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { PrismaClient } from "@prisma/client";
import BadRequestException from "App/Exceptions/BadRequestException";
import { hashPassword } from "App/Utils/HashPassword";
import UserValidator from "App/Validators/UserValidator";

const prisma = new PrismaClient();

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { name, email, password, phone } = await request.validate(UserValidator);

    // check if the inserted email already exists
    const checkIfEmailExists = await prisma.users.findUnique({
      where: { email },
    });

    // check if the inserted email already exists
    const checkIfPhoneExists = await prisma.users.findUnique({
      where: { phone },
    });

    if (Object.keys(checkIfEmailExists || {}).length > 0)
      throw new BadRequestException("E-mail já cadastrado.", 404);
    else if (checkIfPhoneExists)
      throw new BadRequestException("Telefone já cadastrado.", 404);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        phone,
      },
    });

    const { password: pass, ...res } = user;

    response.ok(res);
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params;

    const user = await prisma.users.findUnique({
      // retorna o usuário e o dados relacionados da tabela raffledCodes
      where: { id },
      include: { raffledCodes: true },
    });

    if (!Object.keys(user || {}).length)
      throw new BadRequestException("Usuário não encontrado.", 404);

    const { password, ...res } = user;

    response.ok(res);
  }

  public async index({ response }: HttpContextContract) {
    const users = await prisma.users.findMany({
      include: { raffledCodes: true },
    });

    if (!Object.keys(users || {}).length)
      throw new BadRequestException("Usuários não encontrados.", 404);

    const resp = users.map(user => {
      const { password, ...rest } = user;

      return rest
    })
    
    response.ok(resp);
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params;

    const user = await prisma.users.update({
      where: { id },
      data: request.only(["name", "email"]),
    });

    if (!Object.keys(user || {}).length)
      throw new BadRequestException("Usuário não encontrado.", 404);
    response.ok(user);
  }

  public async destroy({ response, params }: HttpContextContract) {
    const { id } = params;

    const user = await prisma.users.delete({
      where: { id },
    });

    if (!Object.keys(user || {}).length)
      throw new BadRequestException("Usuário não encontrado.", 404);
    response.ok(user);
  }
}
