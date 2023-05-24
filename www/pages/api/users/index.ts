import ServiceUser, {
  IServiceUser,
  IUser,
} from "@/logic/services/user/ServiceUsers";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const { id } = req.query;
  const service: IServiceUser = new ServiceUser();

  if (req.method === "GET" && !req.query.id) {
    try {
      // if (session?.user?.role !== 'ADMIN') {
      //   return res.status(401).send("Não autorizado");
      // }
      const users: IUser[] = await service.list();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "GET" && id) {
    try {
      if (id !== session?.user?.id) {
        return res.status(401).send("Não autorizado");
      }

      const user: IUser = await service.getOne(id);
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
  } else if (req.method === "PUT" && id) {
    try {
      const user: IUser = await service.update(id, req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  }
}
