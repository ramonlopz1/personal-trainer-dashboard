import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ServiceRaffledCodes, { IServiceRaffledCodes } from "@/logic/services/raffledcodes/ServiceRaffledCodes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const service: IServiceRaffledCodes = new ServiceRaffledCodes();

  if (req.method === "GET" && !req.query.id) {
    try {
      const users = await service.list();
      return res.status(200).send(users);
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
