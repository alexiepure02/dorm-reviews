import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Dorm from "@/common/models/Dorm";
import University from "@/common/models/University";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { id } = req.query;

      const university = await University.findById(id).populate("location");

      if (university) {
        return res.status(200).json(university);
      }

      return res
        .status(404)
        .json({ error: `No university found with the id '${id}'` });

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
