import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import City from "@/common/models/City";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { id } = req.query;

      const city = await City.findById(id);

      if (city) {
        return res.status(200).json(city);
      }

      return res
        .status(404)
        .json({ error: `No city found with the id '${id}'` });

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
