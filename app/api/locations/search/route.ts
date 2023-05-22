import dbConnect from "@/lib/dbConnect";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";
import { includeDiacritics } from "@/common/utils/functions";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");

  const limitParam: number | null = limit !== null ? +limit : null;

  if (query && limitParam) {
    const diacriticsQuery = includeDiacritics(query);

    const locations = await Location.find({
      name: { $regex: diacriticsQuery, $options: "i" },
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
