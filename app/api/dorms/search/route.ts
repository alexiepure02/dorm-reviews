import dbConnect from "@/lib/dbConnect";
import Dorm from "@/common/models/Dorm";
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

    const dorms = await Dorm.find({
      name: { $regex: formattedQuery, $options: "i" },
    })
      .limit(limitParam)
      .select("name university")
      .populate("university", "name");

    return NextResponse.json(dorms);
  }
  return NextResponse.json(
    { error: "No query or limit found." },
    { status: 400 }
  );
}
