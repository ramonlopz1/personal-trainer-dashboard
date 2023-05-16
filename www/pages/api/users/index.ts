import { createUser } from "@/logic/core/user/createUser";
import { getUserById } from "@/logic/core/user/getUserById";
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
      const users = await listUsers();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "GET" && req.query.id) {
    try {
      const user = await getUserById(id);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "POST") {
    try {
      const user = await createUser(req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "PUT") {
    try {
      const user = await updateUser(id, req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  }
}
