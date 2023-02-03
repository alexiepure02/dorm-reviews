// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("dorm-reviews-db");
  switch (req.method) {
    case "POST":
      // let bodyObject = JSON.parse(req.body);
      const post = await db.collection("users").insertOne({
        name: "John Doe",
        password: "1234",
      });
      res.json(post);
      break;
    case "GET":
      const allPosts = await db.collection("users").find({}).toArray();
      res.status(200).json(allPosts);
      break;
  }
}
