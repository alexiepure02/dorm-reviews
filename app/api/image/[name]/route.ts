import { S3 } from "aws-sdk";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function GET(request: Request, { params }) {
  const { name } = params;

  const { searchParams } = new URL(request.url);
  const indexesParam: string = searchParams.get("indexes") || "";

  try {
    const params = {
      Bucket: "caminul-tau-bucket",
      Prefix: name,
    };

    if (indexesParam) {
      const indexes: string[] = indexesParam.split(",");

      const filePromises =
        indexes.map(async (index: string) => {
          const fileParams = {
            Bucket: "caminul-tau-bucket",
            Key: `${name}-${index}`,
          };
          const url = await s3.getSignedUrlPromise("getObject", fileParams);
          return url;
        }) || [];

      const files = await Promise.all(filePromises);

      return NextResponse.json(files);
    } else {
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
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const { name } = params;

  const { searchParams } = new URL(request.url);
  const indexesParam: string = searchParams.get("indexes") || "";

  try {
    const listObjectsParams = {
      Bucket: "caminul-tau-bucket",
      Prefix: name,
    };

    if (indexesParam) {
      const indexes: string[] = indexesParam.split(",");

      const deleteObjectsParams = {
        Bucket: "caminul-tau-bucket",
        Delete: {
          Objects: indexes.map((index: string) => ({
            Key: `${name}-${index}`,
          })),
        },
      };

      await s3.deleteObjects(deleteObjectsParams).promise();

      return NextResponse.json(
        `Images with the prefix ${name} and indexes ${indexes} succesfully deleted`
      );
    } else {
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
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
