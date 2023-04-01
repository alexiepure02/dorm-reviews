import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Dorm from "@/common/models/Dorm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { id } = req.query;

      const dorm = await Dorm.findById(id)
        .populate("location")
        .populate("university");

      if (dorm) {
        return res.status(200).json(dorm);
      }

      return res
        .status(404)
        .json({ error: `No dorm found with the id '${id}'` });

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
