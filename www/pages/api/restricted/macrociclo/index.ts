import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import ServiceMacrociclo from "@/logic/services/user/ServiceMacrociclo";
const prisma = new PrismaClient();

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  const service = new ServiceMacrociclo();
  // if (token?.role !== "ADMIN")
  //   return res.status(401).send("Não autorizado.");

  if (!token) return res.status(401).json({ Message: "Não autorizado." });

  if (req.method === "POST") {
    try {
      const macrociclo = await service.add(JSON.parse(req.body));

      return res.status(200).send(macrociclo);
    } catch (err: any) {
      console.log(err)
      return res.status(404).send({ error: true });
    }
  }
}
