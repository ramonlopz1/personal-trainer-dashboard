import ServiceUser from "@/logic/core/user/ServiceUsers";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const service = new ServiceUser();

  if (req.method === "GET" && !req.query.id) {
    try {
      const users = await service.list();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "GET" && req.query.id) {
    try {
      const user = await service.getOne(id);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "POST") {
    try {
      const user = await service.add(req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "PUT") {
    try {
      const user = await service.update(id, req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  }
}
