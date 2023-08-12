import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { Prisma, PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import ServiceGiftCodes from "@/logic/services/giftcodes/ServiceGiftCodes";
const prisma = new PrismaClient();

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const service = new ServiceGiftCodes()
    const token = await getToken({ req, secret });

    // if (token?.role !== "ADMIN")
    //   return res.status(401).send("Não autorizado.");

    // if (!token) return res.status(401).json({ Message: "Não autorizado." });

    try {
      const activation = await service.activateGiftCode(req.body);
      return res.status(200).json(activation);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: "Erro inesperado." });
    }
  } else {
    return res.status(405).json({ Message: "Method not allowed" });
  }
}
