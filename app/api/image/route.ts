import { getNextImageIndex } from "@/common/utils/functions";
import { S3 } from "aws-sdk";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData) as { name: string; file: File };

    if (!(body.file && body.name))
      return NextResponse.json(
        { message: "No file or name passed" },
        { status: 400 }
      );

    const findParams = {
      Bucket: "caminul-tau-bucket",
      Prefix: body.name,
    };

    let lastImageIndex: number;

    try {
      const response = await s3.listObjectsV2(findParams).promise();

      lastImageIndex = getNextImageIndex(response);
    } catch (error) {
      lastImageIndex = 0;
    }

    console.log(lastImageIndex);

    const paddedIndex = lastImageIndex.toString().padStart(3, "0");

    const arrayBuffer = await body.file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const uploadParams = {
      Bucket: "caminul-tau-bucket",
      Key: `${body.name}-${paddedIndex}`,
      Body: fileBuffer,
      ContentType: "image/png",
    };

    await s3.upload(uploadParams).promise();

    return NextResponse.json({
      message: `File uploaded successfully: ${body.name}-${paddedIndex}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
