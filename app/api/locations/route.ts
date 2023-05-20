import dbConnect from "@/lib/dbConnect";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const locations = await Location.find();

  return NextResponse.json(locations);
}

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();

  if (await Location.findOne({ name: body.name })) {
    return NextResponse.json(
      {
        error: `Location with the name '${body.name}' already exists`,
      },
      { status: 400 }
    );
  }

  const newLocation = new Location({
    name: body.name,
    description: body.description,
    position: body.position,
  });

  return newLocation
    .save()
    .then(() => {
      return NextResponse.json(newLocation, { status: 201 });
    })
    .catch((err: string) => {
      return NextResponse.json(
        { error: "Error on '/api/locations': " + err },
        { status: 400 }
      );
    });
}

export async function PUT(request: Request) {
  await dbConnect();

  const body = await request.json();

  const initialLocation = await Location.findById(body._id);

  if (initialLocation.name !== body.name) {
    const location = await Location.findOne({
      name: body.name,
    });

    if (location) {
      return NextResponse.json(
        { error: "Nume deja folosit" },
        {
          status: 400,
        }
      );
    }
  }

  const updatedLocation = await Location.findByIdAndUpdate(body._id, body);

  return NextResponse.json(updatedLocation);
}
