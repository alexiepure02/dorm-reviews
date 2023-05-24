import dbConnect from "@/lib/dbConnect";
import Dorm from "@/common/models/Dorm";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";
import Review from "@/common/models/Review";
import University from "@/common/models/University";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const university = searchParams.get("university");

  let dorms: any[];

  const searchedLocation = await Location.findOne({ name: location });

  if (location && !searchedLocation) {
    return NextResponse.json(
      { error: `Location with the name '${location}' not found` },
      { status: 400 }
    );
  }

  const searchedUniversity = await University.findOne({ name: university });

  if (university && !searchedUniversity) {
    return NextResponse.json(
      {
        error: `University with the name '${university}' not found`,
      },
      { status: 400 }
    );
  }

  let searchCriteria: any;

  if (searchedLocation && searchedUniversity) {
    searchCriteria = {
      location: searchedLocation.id,
      university: searchedUniversity.id,
    };
  } else if (!searchedLocation && searchedUniversity) {
    searchCriteria = { university: searchedUniversity.id };
  } else if (searchedLocation && !searchedUniversity) {
    searchCriteria = { location: searchedLocation.id };
  } else {
    searchCriteria = {};
  }

  dorms = await Dorm.find(searchCriteria);

  const dormsExtended = await Promise.all(
    dorms.map(async (dorm) => {
      const reviews = await Review.find(
        { dorm: dorm._id },
        {
          overallRating: 1,
        }
      );
      if (reviews.length) {
        const generalRating =
          reviews.reduce((total, review) => total + review.overallRating, 0) /
          reviews.length;

        return { dorm, numberOfReviews: reviews.length, generalRating };
      }
      return { dorm, numberOfReviews: 0, generalRating: 0 };
    })
  );

  return NextResponse.json(dormsExtended);
}

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();

  if (await Dorm.findOne({ name: body.name })) {
    return NextResponse.json(
      { error: `Dorm with the name '${body.name}' already exists` },
      { status: 400 }
    );
  }

  const foundUniversity = await University.findById(body.university);

  if (!foundUniversity) {
    return NextResponse.json(
      {
        error: `Unable to create dorm: University with the id '${body.university}' not found`,
      },
      { status: 400 }
    );
  }

  const newDorm = new Dorm({
    name: body.name,
    address: body.address,
    position: body.position,
    university: foundUniversity.id,
    location: foundUniversity.location.name,
  });

  return newDorm
    .save()
    .then(() => {
      return NextResponse.json(newDorm, { status: 201 });
    })
    .catch((err: string) => {
      return NextResponse.json(
        { error: "Error on '/api/dorms': " + err },
        { status: 400 }
      );
    });
}

export async function PUT(request: Request) {
  await dbConnect();

  const body = await request.json();

  const initialDorm = await Dorm.findById(body._id);

  if (initialDorm.name !== body.name) {
    const dorm = await Dorm.findOne({
      name: body.name,
    });

    if (dorm) {
      return NextResponse.json(
        { error: "Nume deja folosit" },
        {
          status: 400,
        }
      );
    }
  }

  if (!(await University.findById(body.university))) {
    return NextResponse.json(
      { error: "Universitatea nu există" },
      {
        status: 400,
      }
    );
  }

  const updatedDorm = await Dorm.findByIdAndUpdate(body._id, body);

  return NextResponse.json(updatedDorm);
}
