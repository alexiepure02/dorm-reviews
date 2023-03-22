import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Dorm from "@/common/models/Dorm";
import City from "@/common/models/City";
import University from "@/common/models/University";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { city, university } = req.query;

      let dorms: any[];

      const searchedCity = await City.findOne({ name: city });

      if (city && !searchedCity) {
        return res
          .status(400)
          .json({ error: `City with the name '${city}' not found` });
      }

      const searchedUniversity = await University.findOne({ name: university });

      if (university && !searchedUniversity) {
        return res.status(400).json({
          error: `University with the name '${university}' not found`,
        });
      }

      if (searchedCity && searchedUniversity) {
        dorms = await Dorm.find({
          city: searchedCity.id,
          university: searchedUniversity.id,
        });
      } else if (!searchedCity && searchedUniversity) {
        dorms = await Dorm.find({ university: searchedUniversity.id });
      } else if (searchedCity && !searchedUniversity) {
        dorms = await Dorm.find({ city: searchedCity.id });
      } else {
        dorms = await Dorm.find();
      }

      if (dorms.length) {
        return res.status(200).json(dorms);
      }

      return res.status(404).json({ error: "No dorms found" });

    case "POST":
      await dbConnect();

      const body = req.body;

      if (await Dorm.findOne({ name: body.name })) {
        return res
          .status(400)
          .json({ error: `Dorm with the name '${body.name}' already exists` });
      }

      const foundCity = await City.findOne({ name: body.city });

      if (!foundCity) {
        return res.status(400).json({
          error: `Unable to create dorm: City with the id '${body.city}' not found`,
        });
      }

      const foundUniversity = await University.findOne({
        name: body.university,
      });

      if (!foundUniversity) {
        return res.status(400).json({
          error: `Unable to create dorm: University with the id '${body.university}' not found`,
        });
      }

      const newDorm = new Dorm({
        name: body.name,
        university: foundUniversity.id,
        city: foundCity.id,
        address: body.address,
      });

      return newDorm
        .save()
        .then(() => {
          return res.status(201).json(newDorm);
        })
        .catch((err: string) => {
          return res
            .status(400)
            .json({ error: "Error on '/api/dorms': " + err });
        });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
