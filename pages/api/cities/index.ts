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

      const cities = await City.find();

      if (cities.length) {
        return res.status(200).json(cities);
      }

      return res.status(404).json({ error: "No cities found" });

    case "POST":
      await dbConnect();

      const body = req.body;

      if (await City.findOne({ name: body.name })) {
        return res
          .status(400)
          .json({ error: `City with the name '${body.name}' already exists` });
      }

      const newCity = new City({
        name: body.name,
        description: body.description,
      });

      return newCity
        .save()
        .then(() => {
          return res.status(201).json(newCity);
        })
        .catch((err: string) => {
          return res
            .status(400)
            .json({ error: "Error on '/api/cities': " + err });
        });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
