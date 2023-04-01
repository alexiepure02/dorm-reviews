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

      const locations = await Location.find();

      if (locations.length) {
        return res.status(200).json(locations);
      }

      return res.status(404).json({ error: "No locations found" });

    case "POST":
      await dbConnect();

      const body = req.body;

      if (await Location.findOne({ name: body.name })) {
        return res.status(400).json({
          error: `Location with the name '${body.name}' already exists`,
        });
      }

      console.log(body);

      const newLocation = new Location({
        name: body.name,
        description: body.description,
        position: body.position,
      });

      return newLocation
        .save()
        .then(() => {
          return res.status(201).json(newLocation);
        })
        .catch((err: string) => {
          return res
            .status(400)
            .json({ error: "Error on '/api/locations': " + err });
        });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
