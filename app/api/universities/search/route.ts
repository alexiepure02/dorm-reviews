import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import { NextResponse } from "next/server";
import { reformatQuery } from "@/common/utils/functions";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");

  const limitParam: number | null = limit !== null ? +limit : null;

  if (query && limitParam) {
    const formattedQuery = reformatQuery(query);

    const universities = await University.find({
      name: { $regex: formattedQuery, $options: "i" },
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
