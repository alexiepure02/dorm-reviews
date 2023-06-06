import { getNextImageIndex } from "@/common/utils/functions";
import { S3 } from "aws-sdk";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Role } from "@/common/Constants";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const images = formData.getAll("images") as File[];

    if (!images || !name)
      return NextResponse.json(
        { message: "No file or name passed" },
        { status: 400 }
      );

    const findParams = {
      Bucket: "caminul-tau-bucket",
      Prefix: name,
    };

    let lastImageIndex: number;
    let indexes: string[] = [];

    try {
      const response = await s3.listObjectsV2(findParams).promise();

      lastImageIndex = getNextImageIndex(response);
    } catch (error) {
      lastImageIndex = 0;
    }

    images.forEach(async (image: File, index: number) => {
      const fileIndex = lastImageIndex + index;
      const paddedIndex = fileIndex.toString().padStart(3, "0");

      indexes.push(paddedIndex);

      const arrayBuffer = await image.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);

      const uploadParams = {
        Bucket: "caminul-tau-bucket",
        Key: `${name}-${paddedIndex}`,
        Body: fileBuffer,
        ContentType: "image/png",
      };

      await s3.upload(uploadParams).promise();
    });

    return NextResponse.json({
      message: `Files uploaded successfully: ${name}`,
      indexes: indexes,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
