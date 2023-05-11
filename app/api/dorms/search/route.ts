import dbConnect from "@/lib/dbConnect";
import Dorm from "@/common/models/Dorm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");

  const limitParam: number | null = limit !== null ? +limit : null;

  if (query && limitParam) {
    const dorms = await Dorm.find({
      name: { $regex: query, $options: "i" },
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
