import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/university";
import Location from "@/common/models/location";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");

  let universities: any[];

  if (location) {
    const searchedLocation = await Location.findOne({ name: location });

    if (!searchedLocation) {
      return NextResponse.json(
        {
          error: `Location with the name '${location}' not found`,
        },
        { status: 400 }
      );
    }

    universities = await University.find({
      location: searchedLocation.id,
    }).populate("location", "name -_id");
  } else {
    universities = await University.find().populate("location", "name -_id");
  }

  return NextResponse.json(universities);
}

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();

  if (await University.findOne({ name: body.name }))
    return NextResponse.json(
      {
        error: `University with the name '${body.name}' already exists`,
      },
      { status: 400 }
    );

  if (!(await Location.findById(body.location)))
    return NextResponse.json(
      {
        error: `Unable to create university: Location with the id '${body.location}' not found`,
      },
      { status: 400 }
    );

  const newUniversity = new University({
    name: body.name,
    location: body.location,
    description: body.description,
  });

  return newUniversity
    .save()
    .then(() => {
      return NextResponse.json(newUniversity, { status: 201 });
    })
    .catch((err: string) => {
      return NextResponse.json(
        { error: "Error on '/api/universities': " + err },
        { status: 400 }
      );
    });
}
