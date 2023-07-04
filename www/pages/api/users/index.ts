import ServiceUser, { IServiceUser } from "@/logic/services/user/ServiceUsers";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Users } from "@prisma/client";

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  const tokenId = token?.sub;

  const { id: qId, providerId: qProviderId, socialId: qSocialId } = req.query;

  const service: IServiceUser = new ServiceUser();

  if (req.method === "GET" && !qId && !qProviderId && !qSocialId) {
    // LIST ALL USERS
    try {
      // if (token?.role !== 'ADMIN') {
      //   return res.status(401).send("Não autorizado");
      // }

      const users: Users[] = await service.list();
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "GET" && !qId && !qSocialId && qProviderId) {
    // LIST ALL USERS WHO HAVE CODES WITH THE PROVIDERID
    try {
      if (qProviderId !== tokenId || token?.role !== "ADMIN")
        return res.status(401).send("Não autorizado");
      const users: Users[] = await service.listByProvider(qProviderId);
      return res.status(200).send(users);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "GET" && qId && !qSocialId && !qProviderId) {
    // GET A USER BY ID

    console.log(token);

    try {
      const user: Users = await service.getOne(qId);

      if (user.socialId !== tokenId && qId !== user.id)
        return res.status(401).send("Não autorizado");

      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  } else if (req.method === "POST" && qSocialId && !qId && !qProviderId) {
    // GET A USER BY SOCIAL ID

    try {
      if (req.body.socialId !== tokenId)
        return res.status(401).send("Não autorizado");

      const user: Users = await service.getOneOrCreateBySocialId(
        req.body,
        qSocialId
      );

      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send({ error: true });
    }
  } else if (req.method === "GET" && qId && qProviderId && !qSocialId) {
    // GET A USER BY ID, WHO HAVE CODES WITH THE PROVIDERID

    try {
      console.log(token?.role);
      if (token?.role !== "ADMIN")
        return res.status(401).send("Não autorizado");
      const user: Users = await service.getOne(qId, qProviderId);
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
  } else if (req.method === "PUT" && qId) {
    // UPDATE A USER BY ID

    try {
      if (qId !== tokenId) return res.status(401).send("Não autorizado");
      const user: Users = await service.update(qId, req.body);
      return res.status(200).send(user);
    } catch (err: any) {
      return res.status(404).send(err["message"]);
    }
  }
}
