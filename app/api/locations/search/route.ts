import dbConnect from "@/lib/dbConnect";
import Location from "@/common/models/location";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");

  const limitParam: number | null = limit !== null ? +limit : null;

  if (query && limitParam) {
    const locations = await Location.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(limitParam)
      .select("name");

    return NextResponse.json(locations);
  }
  return NextResponse.json(
    { error: "No query or limit found." },
    { status: 400 }
  );
}
