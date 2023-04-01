import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import Location from "@/common/models/Location";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { location } = req.query;

      let universities: any[];

      if (location) {
        const searchedLocation = await Location.findOne({ name: location });

        if (!searchedLocation) {
          return res.status(400).json({
            error: `Location with the name '${location}' not found`,
          });
        }

        universities = await University.find({
          location: searchedLocation.id,
        }).populate("location", "name -_id");
      } else {
        universities = await University.find().populate(
          "location",
          "name -_id"
        );
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

      if (!(await Location.findById(body.location)))
        return res.status(400).json({
          error: `Unable to create university: Location with the id '${body.location}' not found`,
        });

      const newUniversity = new University({
        name: body.name,
        location: body.location,
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
