import dbConnect from "@/lib/dbConnect";
import Location from "@/common/models/Location";
import University from "@/common/models/University";
import Dorm from "@/common/models/Dorm";
import Review from "@/common/models/Review";
import { NextResponse } from "next/server";
import { Role } from "@/common/Constants";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const dorm = await Dorm.findById(id)
    .populate({ path: "location", model: Location })
    .populate({ path: "university", model: University });

  if (dorm) {
    const ratings = await Review.find(
      { dorm: dorm.id },
      {
        roomRating: 1,
        bathRating: 1,
        kitchenRating: 1,
        locationRating: 1,
        overallRating: 1,
      }
    );

    const roomRatings = ratings.map((rating) => rating.roomRating);
    const bathRatings = ratings.map((rating) => rating.bathRating);
    const kitchenRatings = ratings.map((rating) => rating.kitchenRating);
    const locationRatings = ratings.map((rating) => rating.locationRating);
    const overallRatings = ratings.map((rating) => rating.overallRating);

    const meanRoomRating =
      roomRatings.reduce((acc, rating) => acc + rating, 0) / roomRatings.length;
    const meanBathRating =
      bathRatings.reduce((acc, rating) => acc + rating, 0) / bathRatings.length;
    const meanKitchenRating =
      kitchenRatings.reduce((acc, rating) => acc + rating, 0) /
      kitchenRatings.length;
    const meanLocationRating =
      locationRatings.reduce((acc, rating) => acc + rating, 0) /
      locationRatings.length;
    const meanOverallRating =
      overallRatings.reduce((acc, rating) => acc + rating, 0) /
      overallRatings.length;

    return NextResponse.json(
      {
        dorm,
        means: {
          meanRoomRating,
          meanBathRating,
          meanKitchenRating,
          meanLocationRating,
          meanOverallRating,
        },
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { error: `No dorm found with the id '${id}'` },
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

  const dorm = await Dorm.findByIdAndDelete(id);

  if (dorm) {
    return NextResponse.json(dorm);
  }

  return NextResponse.json(
    { error: `No dorm found with the id '${id}'` },
    { status: 404 }
  );
}
