import { S3 } from "aws-sdk";
import { NextResponse } from "next/server";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function GET(request: Request, { params }) {
  const { name } = params;

  try {
    const params = {
      Bucket: "caminul-tau-bucket",
      Prefix: name,
    };

    const response = await s3.listObjectsV2(params).promise();

    const filePromises =
      response.Contents?.map(async (object) => {
        const fileParams = {
          Bucket: "caminul-tau-bucket",
          Key: object.Key || "",
        };
        const url = await s3.getSignedUrlPromise("getObject", fileParams);
        return url;
      }) || [];

    const files = await Promise.all(filePromises);
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }) {
  const { name } = params;

  try {
    const listObjectsParams = {
      Bucket: "caminul-tau-bucket",
      Prefix: name,
    };

    const listedObjects = await s3.listObjectsV2(listObjectsParams).promise();

    if (listedObjects.Contents && listedObjects.Contents.length > 0) {
      const deleteObjectsParams = {
        Bucket: "caminul-tau-bucket",
        Delete: {
          Objects: listedObjects.Contents.map((obj) => ({ Key: obj.Key! })),
        },
      };

      await s3.deleteObjects(deleteObjectsParams).promise();
      return NextResponse.json(
        `Images with the prefix ${name} succesfully deleted`
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
