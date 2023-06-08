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
  const service: IServiceRaffledCodes = new ServiceRaffledCodes();

  if (req.method === "GET" && !req.query.id) {
    // if (token?.role !== "ADMIN") {
    //   return res.status(401).send("Não autorizado");
    // }
    try {
      const codes = await service.list();
      return res.status(200).send(codes);
    } catch (err: any) {
      return res.status(404).send({ Mensagem: err["message"] });
    }
  } else if (req.method === "POST") {
    try {
      await service.active(req.body);
      return res.status(200).send("Código ativado com sucesso!");
    } catch (err: any) {
      return res.status(404).send("Código inválido.");
    }
  } else if(req.method === 'DELETE' && req.query.id) {
    try {
      await service.deleteAll(req.query.id)
      return res.status(200).send('Códigos expirados.')
    } catch (err: any) {
      return res.status(404).send('Erro inesperado.')
    }
    
  }
}
