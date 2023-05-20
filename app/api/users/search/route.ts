import User from "@/common/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");

  const limitParam: number | null = limit !== null ? +limit : null;

  if (query && limitParam) {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    })
      .limit(limitParam)
      .select("username");

    return NextResponse.json(users);
  }
  return NextResponse.json(
    { error: "No query or limit found." },
    { status: 400 }
  );
}
