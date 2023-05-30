import ServiceUser, {
  IServiceUser,
  IUser,
} from "@/logic/services/user/ServiceUsers";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  const tokenId = token?.sub;

  const { id: queryId } = req.query;
  const service: IServiceUser = new ServiceUser();

  if (req.method === "GET" && !queryId) {
    try {
      // if (token?.role !== 'ADMIN') {
      //   return res.status(401).send("Não autorizado");
      // }

      const users: IUser[] = await service.list();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "GET" && queryId) {
    try {
      if (queryId !== tokenId) return res.status(401).send("Não autorizado");
      const user: IUser = await service.getOne(queryId);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "POST") {
    try {
      await service.add(req.body);
      return res.status(200).send("Usuário criado com sucesso");
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "PUT" && queryId) {
    try {
      if (queryId !== tokenId) return res.status(401).send("Não autorizado");
      const user: IUser = await service.update(queryId, req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  }
}
