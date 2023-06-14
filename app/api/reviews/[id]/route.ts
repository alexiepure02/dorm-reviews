import dbConnect from "@/lib/dbConnect";
import Review from "@/common/models/Review";
import User from "@/common/models/User";
import Dorm from "@/common/models/Dorm";
import { NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request, { params }) {
  await dbConnect();

  const { id } = params;

  const review = await Review.findById(id)
    .populate({ path: "user", model: User, select: "-password" })
    .populate({ path: "dorm", model: Dorm });

  if (review) {
    return NextResponse.json(review);
  }

  return NextResponse.json(
    { error: `No review found with the id '${id}'` },
    { status: 404 }
  );
}

export async function DELETE(request: Request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  await dbConnect();

  const { id } = params;

  const review = await Review.findByIdAndDelete(id);

  if (review) {
    if (review.imageIndexes.length !== 0) {
      console.log("delete images?");
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const deleteObjectsParams = {
        Bucket: "caminul-tau-bucket",
        Delete: {
          Objects: review.imageIndexes.map((index: string) => ({
            Key: `${review.dorm.toString()}-${index}`,
          })),
        },
      };

      await s3.deleteObjects(deleteObjectsParams).promise();
    }
    return NextResponse.json(review);
  }

  return NextResponse.json(
    { error: `No review found with the id '${id}'` },
    { status: 404 }
  );
}
