import dbConnect from "@/lib/dbConnect";
import User from "@/common/models/User";
import Dorm from "@/common/models/Dorm";
import Review from "@/common/models/Review";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user");
  const dorm = searchParams.get("dorm");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  let pageParam: number = page !== null ? +page : 0;
  let limitParam: number = limit !== null ? +limit : 10;
  let reviews: any[];
  let countReviews: number;

  const searchedUser = await User.findOne({ username: user }, "-password");

  if (user && !searchedUser) {
    return NextResponse.json(
      {
        error: `User with the name '${user}' not found`,
      },
      { status: 400 }
    );
  }

  const searchedDorm = await Dorm.findOne({ name: dorm });

  if (dorm && !searchedDorm) {
    return NextResponse.json(
      {
        error: `Dorm with the name '${dorm}' not found`,
      },
      { status: 400 }
    );
  }

  if (searchedUser && searchedDorm) {
    reviews = await Review.find({
      user: searchedUser.id,
      dorm: searchedDorm.id,
    })
      .populate("user", "-password")
      .populate("dorm", "name")
      .limit(limitParam)
      .skip(pageParam * limitParam);

    countReviews = await Review.count({
      user: searchedUser.id,
      dorm: searchedDorm.id,
    });
  } else if (!searchedUser && searchedDorm) {
    reviews = await Review.find({ dorm: searchedDorm.id })
      .populate("user", "-password")
      .populate("dorm", "name")
      .limit(limitParam)
      .skip(pageParam * limitParam);

    countReviews = await Review.count({
      dorm: searchedDorm.id,
    });
  } else if (searchedUser && !searchedDorm) {
    reviews = await Review.find({ user: searchedUser.id })
      .populate("user", "-password")
      .populate("dorm", "name")
      .limit(limitParam)
      .skip(pageParam * limitParam);

    countReviews = await Review.count({
      user: searchedUser.id,
    });
  } else {
    reviews = await Review.find()
      .populate("user", "-password")
      .populate("dorm", "name")
      .limit(limitParam)
      .skip(pageParam * limitParam);

    countReviews = await Review.count({});
  }
  
  return NextResponse.json({ reviews, countReviews });
}

export async function POST(request: Request, { params }) {
  await dbConnect();

  const body = await request.json();

  const foundUser = await User.findOne({ username: body.username });

  if (!foundUser) {
    return NextResponse.json(
      {
        error: `Unable to create review: User with the username '${body.username}' not found`,
      },
      { status: 400 }
    );
  }

  const foundDorm = await Dorm.findOne({ name: body.dorm });

  if (!foundDorm)
    return NextResponse.json(
      {
        error: `Unable to create review: Dorm with the name '${body.dorm}' not found`,
      },
      { status: 400 }
    );

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
      return NextResponse.json(newReview, { status: 201 });
    })
    .catch((err: string) => {
      return NextResponse.json(
        { error: "Error on '/api/reviews': " + err },
        { status: 400 }
      );
    });
}
