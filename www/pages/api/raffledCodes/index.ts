import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ServiceRaffledCodes from "@/logic/core/raffledcodes/ServiceRaffledCodes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const service = new ServiceRaffledCodes();

  if (req.method === "GET" && !req.query.id) {
    try {
      const users = await service.list();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "GET" && req.query.id) {
    try {
      const user = await service.get(id);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "POST") {
    try {
      const user = await service.active(req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  }
}
