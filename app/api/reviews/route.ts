import dbConnect from "@/lib/dbConnect";
import User from "@/common/models/User";
import Dorm from "@/common/models/Dorm";
import Review from "@/common/models/Review";
import { NextResponse } from "next/server";
import {
  MIN_CHARS_COMMENT,
  ORDER_BY_ENUM,
  ORDER_ENUM,
} from "@/common/Constants";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user");
  const dorm = searchParams.get("dorm");
  const page = +(searchParams.get("page") || 0);
  const limit = +(searchParams.get("limit") || 10);
  const orderBy = searchParams.get("orderBy") || ORDER_BY_ENUM.createdAt;
  const order = searchParams.get("order") || ORDER_ENUM.desc;

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

  let searchCriteria: any;
  const sortCriteria = {};

  if (searchedUser && searchedDorm) {
    searchCriteria = {
      user: searchedUser.id,
      dorm: searchedDorm.id,
    };
  } else if (!searchedUser && searchedDorm) {
    searchCriteria = {
      dorm: searchedDorm.id,
    };
  } else if (searchedUser && !searchedDorm) {
    searchCriteria = { user: searchedUser.id };
  } else {
    searchCriteria = {};
  }

  if (
    !(
      orderBy === ORDER_BY_ENUM.overallRating ||
      orderBy === ORDER_BY_ENUM.createdAt
    )
  ) {
    return NextResponse.json(
      {
        error: `Order by '${orderBy}' is not valid`,
      },
      { status: 400 }
    );
  }

  if (!(order === ORDER_ENUM.asc || order === ORDER_ENUM.desc)) {
    return NextResponse.json(
      {
        error: `Order '${order}' not valid`,
      },
      { status: 400 }
    );
  }

  sortCriteria[orderBy] = order;

  reviews = await Review.find(searchCriteria)
    .populate("user", "-password")
    .populate("dorm", "name")
    .limit(limit)
    .skip(page * limit)
    .sort(sortCriteria);

  countReviews = await Review.count(searchCriteria);

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

  if (body.comment.length <= MIN_CHARS_COMMENT) {
    return NextResponse.json(
      {
        error:
          "Comentariul are mai puțin de " + MIN_CHARS_COMMENT + " de caractere",
      },
      { status: 400 }
    );
  }

  if (body.roomRating < 1 || body.roomRating > 5) {
    return NextResponse.json(
      {
        error: "Nu ai selectat un rating pentru cameră",
      },
      { status: 400 }
    );
  }

  if (body.bathRating < 1 || body.bathRating > 5) {
    return NextResponse.json(
      {
        error: "Nu ai selectat un rating pentru baie",
      },
      { status: 400 }
    );
  }

  if (body.kitchenRating < 1 || body.kitchenRating > 5) {
    return NextResponse.json(
      {
        error: "Nu ai selectat un rating pentru bucătărie",
      },
      { status: 400 }
    );
  }

  if (body.locationRating < 1 || body.locationRating > 5) {
    return NextResponse.json(
      {
        error: "Nu ai selectat un rating pentru locație",
      },
      { status: 400 }
    );
  }

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
