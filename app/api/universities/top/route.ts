import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const limit = +(searchParams.get("limit") || 4);

  const universities = await University.find()
    .limit(limit)
    .populate({ path: "location", model: Location, select: "name -_id" });

  return NextResponse.json(universities);
}
