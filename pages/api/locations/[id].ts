import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Location from "@/common/models/Location";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { id } = req.query;

      const location = await Location.findById(id);

      if (location) {
        return res.status(200).json(location);
      }

      return res
        .status(404)
        .json({ error: `No location found with the id '${id}'` });

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
