import User from "@/common/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const user = await User.findById(id);

  if (user) {
    return NextResponse.json(user);
  }

  return NextResponse.json(
    { error: `No user found with the id '${id}'` },
    { status: 404 }
  );
}
