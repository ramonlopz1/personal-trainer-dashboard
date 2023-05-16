import { activeCode } from "@/logic/core/raffledcodes/activeCode";
import { getCodeById } from "@/logic/core/raffledcodes/getCodeById";
import { listCodes } from "@/logic/core/raffledcodes/listCodes";
import { listUsers } from "@/logic/core/user/listUsers";
import { updateUser } from "@/logic/core/user/updateUser";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET" && !req.query.id) {
    try {
      const users = await listCodes();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "GET" && req.query.id) {
    try {
      const user = await getCodeById(id);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "POST") {
    try {
      const user = await activeCode(req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  }
}
