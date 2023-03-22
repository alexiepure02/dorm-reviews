import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Review from "@/common/models/Review";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { id } = req.query;

      const review = await Review.findById(id)
        .populate("user", "-password")
        .populate("dorm");

      if (review) {
        return res.status(200).json(review);
      }

      return res
        .status(404)
        .json({ error: `No review found with the id '${id}'` });

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
