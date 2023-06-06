import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Role } from "@/common/Constants";
import { authOptions } from "../auth/[...nextauth]/route";

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
    }).populate({ path: "location", model: Location, select: "name -_id" });
  } else {
    universities = await University.find().populate({
      path: "location",
      model: Location,
      select: "name -_id",
    });
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

  if (await University.findOne({ acronym: body.acronym }))
    return NextResponse.json(
      {
        error: `University with the acronym '${body.acronym}' already exists`,
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
    acronym: body.acronym,
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

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (session !== undefined && session?.user?.role !== Role.admin) {
    return NextResponse.json(
      { error: "Authentication and admin role required" },
      { status: 401 }
    );
  }

  await dbConnect();

  const body = await request.json();

  const initialUniversity = await University.findById(body._id);

  if (initialUniversity.name !== body.name) {
    if (
      await University.findOne({
        name: body.name,
      })
    ) {
      return NextResponse.json(
        { error: "Nume deja folosit" },
        {
          status: 400,
        }
      );
    }

    if (
      await University.findOne({
        acronym: body.acronym,
      })
    ) {
      return NextResponse.json(
        { error: "Acronim deja folosit" },
        {
          status: 400,
        }
      );
    }
  }

  if (!(await Location.findById(body.location))) {
    return NextResponse.json(
      { error: "Locația nu există" },
      {
        status: 400,
      }
    );
  }

  const updatedUniversity = await University.findByIdAndUpdate(body._id, body);

  return NextResponse.json(updatedUniversity);
}
