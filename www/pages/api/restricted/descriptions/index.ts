import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import ServiceUsersHealthInformationDescriptions from "@/logic/services/user/ServiceUsersHealthInformationDescriptions";
const prisma = new PrismaClient();

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  const service = new ServiceUsersHealthInformationDescriptions();
  // if (token?.role !== "ADMIN")
  //   return res.status(401).send("Não autorizado.");

  if (!token) return res.status(401).json({ Message: "Não autorizado." });

  if (req.method === "POST") {
    try {
      const description = await service.add(JSON.parse(req.body));
      console.log(description)
      return res.status(200).send(description);
    } catch (err: any) {
      console.log(err)
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === 'PUT' &&  req.query.id) {
    try {
      // if (req.query.id !== token?.id) return res.status(401).send("Não autorizado");
      const description = await service.update(req.query.id, JSON.parse(req.body));
      return res.status(200).send(description);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  }
}
