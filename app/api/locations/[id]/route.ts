import dbConnect from "@/lib/dbConnect";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const location = await Location.findById(id);

  if (location) {
    return NextResponse.json(location);
  }

  return NextResponse.json(
    { error: `No location found with the id '${id}'` },
    { status: 404 }
  );
}

export async function DELETE(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const location = await Location.findByIdAndDelete(id);

  if (location) {
    return NextResponse.json(location);
  }

  return NextResponse.json(
    { error: `No location found with the id '${id}'` },
    { status: 404 }
  );
}
