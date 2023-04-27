import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const university = await University.findById(id).populate("location");

  if (university) {
    return NextResponse.json(university);
  }

  return NextResponse.json(
    { error: `No university found with the id '${id}'` },
    { status: 404 }
  );
}