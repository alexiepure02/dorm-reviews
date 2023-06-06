import dbConnect from "@/lib/dbConnect";
import University from "@/common/models/University";
import Location from "@/common/models/Location";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Role } from "@/common/Constants";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const university = await University.findById(id).populate({
    path: "location",
    model: Location,
  });

  if (university) {
    return NextResponse.json(university);
  }

  return NextResponse.json(
    { error: `No university found with the id '${id}'` },
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

  const university = await University.findByIdAndDelete(id);

  if (university) {
    return NextResponse.json(university);
  }

  return NextResponse.json(
    { error: `No university found with the id '${id}'` },
    { status: 404 }
  );
}
