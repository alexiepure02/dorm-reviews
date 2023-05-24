import dbConnect from "@/lib/dbConnect";
import Review from "@/common/models/Review";
import User from "@/common/models/User";
import Dorm from "@/common/models/Dorm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const review = await Review.findById(id)
    .populate("user", "-password")
    .populate("dorm");

  if (review) {
    return NextResponse.json(review);
  }

  return NextResponse.json(
    { error: `No review found with the id '${id}'` },
    { status: 404 }
  );
}

export async function DELETE(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const review = await Review.findByIdAndDelete(id);

  if (review) {
    return NextResponse.json(review);
  }

  return NextResponse.json(
    { error: `No review found with the id '${id}'` },
    { status: 404 }
  );
}
