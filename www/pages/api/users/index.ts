import ServiceUser, { IServiceUser, IUser } from "@/logic/services/user/ServiceUsers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const service: IServiceUser = new ServiceUser();

  if (req.method === "GET" && !req.query.id) {
    try {
      const users: IUser[] = await service.list();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "GET" && id) {
    try {
      const user: IUser = await service.getOne(id);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "POST") {
    try {
      const user: IUser = await service.add(req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "PUT" && id) {
    try {
      const user: IUser = await service.update(id, req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  }
}
