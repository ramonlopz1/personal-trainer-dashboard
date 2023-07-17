import { NextApiHandler } from "next";
import { getServerSession } from "next-auth/next";
import { NextAuthHandler } from "next-auth/react";
import { authOptions } from "../[...nextauth]";

const callbackHandler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  console.log(session)

  if (!session) {
    return res.status(401).end("Unauthorized");
  }

  return res.status(200).redirect("/protected");

  // Custom callback logic
  // ...
};

export default callbackHandler as NextAuthHandler;
