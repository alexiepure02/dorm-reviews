import Review from "@/common/models/Review";
import { S3 } from "aws-sdk";
import { NextResponse } from "next/server";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function DELETE(request: Request, { params }) {
  const { name, index } = params;

  try {
    const params = {
      Bucket: "caminul-tau-bucket",
      Key: name + "-" + index,
    };

    await s3.deleteObject(params).promise();

    const review = await Review.findOne({ imageIndexes: index });

    if (review) {
      const newIndexes = review.imageIndexes.filter(
        (imageIndex: string) => imageIndex !== index
      );

      await Review.findByIdAndUpdate(review._id, {
        imageIndexes: newIndexes,
      });
    }

    return NextResponse.json({ message: "Image deleted succesfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
