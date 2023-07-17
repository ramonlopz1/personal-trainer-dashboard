import { NextApiHandler } from "next";
import { NextAuthHandler, getSession } from "next-auth/react";

const callbackHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end("Unauthorized");
    return;
  }

  return res.status(200).redirect("/protected");
  // Custom callback logic
  // ...
};

export default callbackHandler as NextAuthHandler;
