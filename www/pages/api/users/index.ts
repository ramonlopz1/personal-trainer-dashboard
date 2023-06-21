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

  const { id: queryId, providerId: queryProviderId } = req.query;
  const service: IServiceUser = new ServiceUser();

  if (req.method === "GET" && !queryId && !queryProviderId) {
    // LIST ALL USERS
    try {
      // if (token?.role !== 'ADMIN') {
      //   return res.status(401).send("Não autorizado");
      // }

      const users: IUser[] = await service.list();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "GET" && !queryId && queryProviderId) {
    // LIST ALL USERS WHO HAVE CODES WITH THE PROVIDERID
    try {
      if (queryProviderId !== tokenId || token?.role !== "ADMIN")
        return res.status(401).send("Não autorizado");
      const users: IUser[] = await service.listByProvider(queryProviderId);
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "GET" && queryId && !queryProviderId) {
    // GET A USER BY ID

    try {
      if (queryId !== tokenId) return res.status(401).send("Não autorizado");
      const user: IUser = await service.getOne(queryId);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "GET" && queryId && queryProviderId) {
    // GET A USER BY ID, WHO HAVE CODES WITH THE PROVIDERID

    try {
      console.log(token?.role);
      if (token?.role !== "ADMIN")
        return res.status(401).send("Não autorizado");
      const user: IUser = await service.getOne(queryId, queryProviderId);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "POST") {
    // CREATE A NEW USER

    try {
      await service.add(req.body);
      return res.status(200).send("Usuário criado com sucesso");
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "PUT" && queryId) {
    // UPDATE A USER BY ID

    try {
      if (queryId !== tokenId) return res.status(401).send("Não autorizado");
      const user: IUser = await service.update(queryId, req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  }
}
