import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  const tokenId = token?.sub;
  // if (token?.role !== "ADMIN")
  //   return res.status(401).send("Não autorizado.");

  if (!token) res.status(401).json({ Message: "Não autorizado." });

  const code = uuid().split("-")[0].toUpperCase();
  try {
    const store = await prisma.generatedCodes.create({
      data: {
        code,
        provider: token?.name!,
      },
    });
    return res.status(200).json(store);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Message: "Erro inesperado." });
  }

  // if(!code) throw new BadRequestException("Erro inesperado.", 500)
}
