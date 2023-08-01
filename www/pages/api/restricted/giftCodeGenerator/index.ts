import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import { Prisma, PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();

const secret = process.env.SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const token = await getToken({ req, secret });

    // if (token?.role !== "ADMIN")
    //   return res.status(401).send("Não autorizado.");

    // if (!token) return res.status(401).json({ Message: "Não autorizado." });

    const code = uuid().split("-")[0].toUpperCase();

    try {
      const checkActivatedCodes = await prisma.raffledCodes.count({
        where: {
          expired: false,
          ownerId: req.body.ownerId,
          providerId: req.body.providerId,
        },
      });

      if (checkActivatedCodes >= 10) {
        // get id of the oldest valid/activated codes
        const oldestRecords = await prisma.raffledCodes.findMany({
          where: {
            ownerId: req.body.ownerId,
            providerId: req.body.providerId,
            win: false,
          },
          orderBy: {
            createdAt: Prisma.SortOrder.asc, // Order the records by the 'createdAt' field in ascending order (oldest to newest).
          },
          take: 10, // Limit the result to the specified number of records.
        });

        const idsToUpdate = oldestRecords.map((record) => record.id);
        await prisma.raffledCodes.updateMany({
          where: { id: { in: idsToUpdate } },
          data: {
            win: true,
          },
        });

        const store = await prisma.winCodes.create({
          data: {
            code,
            ownerId: token?.sub!,
          },
        });

        return res.status(200).json(store);
      } else {
        return res
          .status(204)
          .json({ Message: "Você precisa ter pelo menos 10 códigos ativos" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Message: "Erro inesperado." });
    }
  } else {
    return res.status(405).json({ Message: "Method not allowed" });
  }
}
