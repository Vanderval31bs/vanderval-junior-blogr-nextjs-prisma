import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../lib/prisma';
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      
      await prisma.post.create({
        data: {
          title: "POST FROM THE CRON!",
          content: "CONTENT!",
        },);

      // if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
      console.log("succeded to call!");
      sendgrid.send({
        to: "vander31bs@gmail.com",
        text: "EMAIL TESTE 1",
        from: "ambitus@w2s3.com.br",
        subject: "TITLE 1",
      });
      sendgrid.send({
        to: "gusttavlang@gmail.com",
        text: "EMAIL TESTE 2",
        from: "ambitus@w2s3.com.br",
        subject: "TITLE 2",
      });
      res.status(200).json({ success: true });
      //   } else {
      //     res.status(401).json({ success: false });
      //   }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
