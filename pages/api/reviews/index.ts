import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import Location from "@/common/models/Location";
import User from "@/common/models/User";
import Dorm from "@/common/models/Dorm";
import Review from "@/common/models/Review";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await dbConnect();

      const { user, dorm } = req.query;

      let reviews: any[];

      const searchedUser = await User.findOne({ username: user }, "-password");

      if (user && !searchedUser) {
        return res.status(400).json({
          error: `User with the name '${user}' not found`,
        });
      }

      const searchedDorm = await Dorm.findOne({ name: dorm });

      if (dorm && !searchedDorm) {
        return res.status(400).json({
          error: `Dorm with the name '${dorm}' not found`,
        });
      }

      if (searchedUser && searchedDorm) {
        reviews = await Review.find({
          user: searchedUser.id,
          dorm: searchedDorm.id,
        }).populate("user", "-password");
      } else if (!searchedUser && searchedDorm) {
        reviews = await Review.find({ dorm: searchedDorm.id }).populate(
          "user",
          "-password"
        );
      } else if (searchedUser && !searchedDorm) {
        reviews = await Review.find({ user: searchedUser.id }).populate(
          "user",
          "-password"
        );
      } else {
        reviews = await Review.find().populate("user", "-password");
      }

      if (reviews.length) {
        return res.status(200).json(reviews);
      }

      return res.status(404).json({ error: "No reviews found" });

    case "POST":
      await dbConnect();

      const body = req.body;

      const foundUser = await User.findOne({ username: body.username });

      if (!foundUser) {
        return res.status(400).json({
          error: `Unable to create review: User with the username '${body.username}' not found`,
        });
      }

      const foundDorm = await Dorm.findOne({ name: body.dorm });

      if (!foundDorm)
        return res.status(400).json({
          error: `Unable to create review: Dorm with the name '${body.dorm}' not found`,
        });

      const overallRating =
        (body.roomRating +
          body.bathRating +
          body.kitchenRating +
          body.locationRating) /
        4;

      const newReview = new Review({
        user: foundUser.id,
        dorm: foundDorm.id,
        likes: 0,
        roomRating: body.roomRating,
        roomComment: body.roomComment || null,
        bathRating: body.bathRating,
        bathComment: body.bathComment || null,
        kitchenRating: body.kitchenRating,
        kitchenComment: body.kitchenComment || null,
        locationRating: body.locationRating,
        locationComment: body.locationComment || null,
        overallRating: overallRating,
        comment: body.comment,
      });

      return newReview
        .save()
        .then(() => {
          return res.status(201).json(newReview);
        })
        .catch((err: string) => {
          return res
            .status(400)
            .json({ error: "Error on '/api/reviews': " + err });
        });

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
