import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import ServiceRaffledCodes, {
  IServiceRaffledCodes,
} from "@/logic/services/raffledcodes/ServiceRaffledCodes";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret });
  const tokenId = token?.sub;

  const service: IServiceRaffledCodes = new ServiceRaffledCodes();

  if (req.method === "GET" && !req.query.id) {
    // GET ALL CODES

    // if (token?.role !== "ADMIN") {
    //   return res.status(401).send("Não autorizado");
    // }
    try {
      const codes = await service.list();
      return res.status(200).send(codes);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "GET" && req.query.id) {
    // GET ALL CODES BY USER ID

    // if (token?.role !== "ADMIN") {
    //   return res.status(401).send("Não autorizado");
    // }
    try {
      const codes = await service.listByProvider(req.query.id);
      return res.status(200).send(codes);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "POST") {
    // ACTIVATE A NEW CODE

    try {
      await service.active(req.body);
      return res.status(200).send("Código ativado com sucesso!");
    } catch (err: any) {
      return res.status(404).send("Código inválido.");
    }
  } else if (req.method === "DELETE" && req.query.id) {
    // DELETE ALL CODES BY USER ID

    try {
      await service.deleteAll(req.query.id);
      return res.status(200).send("Códigos expirados.");
    } catch (err: any) {
      return res.status(404).send("Erro inesperado.");
    }
  } else if (
    req.method === "PUT" &&
    req.body.expire &&
    req.query.id &&
    req.query.providerId
  ) {
    try {
      // if (req.query.id !== tokenId)
      //   return res.status(401).send("Não autorizado");

      await service.expire(req.query.id, req.query.providerId);
      return res.status(200).send("Códigos expirados com sucesso.");
    } catch (err: any) {
      return res.status(404).send("Erro inesperado.");
    }
  }
}
