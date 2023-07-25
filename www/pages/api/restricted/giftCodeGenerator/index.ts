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
  if (req.method === "POST") {
    const token = await getToken({ req, secret });

    // if (token?.role !== "ADMIN")
    //   return res.status(401).send("Não autorizado.");

    // if (!token) return res.status(401).json({ Message: "Não autorizado." });

    const code = uuid().split("-")[0].toUpperCase();

    try {
      const checkActivatedCodes = await prisma.raffledCodes.count({
        where: {
          expired: false,
          ownerId: req.body.ownerId,
          providerId: req.body.providerId,
        },
      });

      if (checkActivatedCodes >= 10) {
        const store = await prisma.winCodes.create({
          data: {
            code,
            ownerId: token?.sub!,
          },
        });
        return res.status(200).json(store);
      } else {
        return res
          .status(204)
          .json({ Message: "Você precisa ter pelo menos 10 códigos ativos" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: "Erro inesperado." });
    }
  } else {
    return res.status(405).json({ Message: "Method not allowed" });
  }
}
