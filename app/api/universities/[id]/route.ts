import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const university = await University.findById(id).populate({
    path: "location",
    model: Location,
  });

  if (university) {
    return NextResponse.json(university);
  }

  return NextResponse.json(
    { error: `No university found with the id '${id}'` },
    { status: 404 }
  );
}

export async function DELETE(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const university = await University.findByIdAndDelete(id);

  if (university) {
    return NextResponse.json(university);
  }

  return NextResponse.json(
    { error: `No university found with the id '${id}'` },
    { status: 404 }
  );
}
