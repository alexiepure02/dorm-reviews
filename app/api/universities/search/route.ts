import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/university";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");

  const limitParam: number | null = limit !== null ? +limit : null;

  if (query && limitParam) {
    const universities = await University.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(limitParam)
      .select("name location")
      .populate("location", "name");

    return NextResponse.json(universities);
  }
  return NextResponse.json(
    { error: "No query or limit found." },
    { status: 400 }
  );
}
