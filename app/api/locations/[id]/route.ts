import dbConnect from "@/lib/dbConnect";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Role } from "@/common/Constants";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const location = await Location.findById(id);

  if (location) {
    return NextResponse.json(location);
  }

  return NextResponse.json(
    { error: `No location found with the id '${id}'` },
    { status: 404 }
  );
}

export async function DELETE(request: Request, { params }) {
  const session = await getServerSession(authOptions);

  if (session !== undefined && session?.user?.role !== Role.admin) {
    return NextResponse.json(
      { error: "Authentication and admin role required" },
      { status: 401 }
    );
  }

  await dbConnect();

  const { id } = params;

  const location = await Location.findByIdAndDelete(id);

  if (location) {
    return NextResponse.json(location);
  }

  return NextResponse.json(
    { error: `No location found with the id '${id}'` },
    { status: 404 }
  );
}
