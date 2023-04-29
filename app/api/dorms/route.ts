import dbConnect from "@/lib/dbConnect";
import Dorm from "@/common/models/Dorm";
import Location from "@/common/models/Location";
import University from "@/common/models/University";
import { NextResponse } from "next/server";

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

  if (searchedLocation && searchedUniversity) {
    dorms = await Dorm.find({
      location: searchedLocation.id,
      university: searchedUniversity.id,
    });
  } else if (!searchedLocation && searchedUniversity) {
    dorms = await Dorm.find({ university: searchedUniversity.id });
  } else if (searchedLocation && !searchedUniversity) {
    dorms = await Dorm.find({ location: searchedLocation.id });
  } else {
    dorms = await Dorm.find();
  }

  if (dorms.length) {
    return NextResponse.json(dorms);
  }

  return NextResponse.json({ error: "No dorms found" }, { status: 404 });
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

  const foundLocation = await Location.findOne({ name: body.location });

  if (!foundLocation) {
    return NextResponse.json(
      {
        error: `Unable to create dorm: Location with the id '${body.location}' not found`,
      },
      { status: 400 }
    );
  }

  const foundUniversity = await University.findOne({
    name: body.university,
  });

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
    university: foundUniversity.id,
    location: foundLocation.id,
    address: body.address,
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
