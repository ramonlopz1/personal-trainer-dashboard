import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  console.log(session, "123333333");
  const code = uuid().split("-")[0].toUpperCase();

  const store = await prisma.generatedCodes.create({
    data: {
      code,
    },
  });

  // if(!code) throw new BadRequestException("Erro inesperado.", 500)

  return res.status(200).json(store);
}
