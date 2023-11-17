import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import ServiceFCeVO2Max from "@/logic/services/user/ServiceFCeVO2Max";
const prisma = new PrismaClient();

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  const service = new ServiceFCeVO2Max();
  // if (token?.role !== "ADMIN")
  //   return res.status(401).send("Não autorizado.");

  if (!token) return res.status(401).json({ Message: "Não autorizado." });

  if (req.method === "POST") {
    try {
      const fCeVO2Max = await service.add(JSON.parse(req.body));

      return res.status(200).send(fCeVO2Max);
    } catch (err: any) {
      console.log(err)
      return res.status(404).send({ error: true });
    }
  }
}
