import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import City from "@/common/models/City";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { city } = req.query;

      let universities: any[];

      if (city) {
        const searchedCity = await City.findOne({ name: city });

        if (!searchedCity) {
          return res.status(400).json({
            error: `City with the name '${city}' not found`,
          });
        }

        universities = await University.find({ city: searchedCity.id });
      } else {
        universities = await University.find();
      }

      if (universities.length) {
        return res.status(200).json(universities);
      }

      return res.status(404).json({ error: "No universities found" });

    case "POST":
      await dbConnect();

      const body = req.body;

      if (await University.findOne({ name: body.name }))
        return res.status(400).json({
          error: `University with the name '${body.name}' already exists`,
        });

      if (!(await City.findById(body.city)))
        return res.status(400).json({
          error: `Unable to create university: City with the id '${body.city}' not found`,
        });

      const newUniversity = new University({
        name: body.name,
        city: body.city,
        description: body.description,
      });

      return newUniversity
        .save()
        .then(() => {
          return res.status(201).json(newUniversity);
        })
        .catch((err: string) => {
          return res
            .status(400)
            .json({ error: "Error on '/api/universities': " + err });
        });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
