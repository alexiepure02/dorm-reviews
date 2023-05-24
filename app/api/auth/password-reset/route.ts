// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/dbConnect";
import User from "@/common/models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "@/common/utils/email/sendEmail";
import Token from "@/common/models/Token";
import { EMAIL_TYPE_ENUM, passwordRegEx } from "@/common/Constants";
import { NextResponse } from "next/server";
import { type } from "os";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  let passwordResetToken = await Token.findOne({ userId: body.userId });

  if (!passwordResetToken) {
    return NextResponse.json(
      {
        error: "Token de resetare a parolei este invalid sau a expirat",
      },
      { status: 400 }
    );
  }

  const isValid = await bcrypt.compare(body.token, passwordResetToken.token);

  if (!isValid || !passwordResetToken) {
    return NextResponse.json(
      {
        error: "Token de resetare a parolei este invalid sau a expirat",
      },
      { status: 400 }
    );
  }

  if (!passwordRegEx.test(body.password)) {
    return NextResponse.json(
      {
        error:
          "Parola trebuie să conțină o literă, o cifră și un caracter special",
      },
      { status: 400 }
    );
  }

  if (body.password !== body.cpassword) {
    return NextResponse.json(
      {
        error: "Parola și parola de confirmare nu se potrivesc",
      },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(process.env.BCRYPT_SALT)
  );

  await User.updateOne(
    { _id: body.userId },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  const user = await User.findById({ _id: body.userId });

  sendEmail(
    EMAIL_TYPE_ENUM.resetPassword,
    user.email,
    "Parolă resetată cu success",
    {
      name: user.username,
    }
  );
  await passwordResetToken.deleteOne({ userId: body.userId });

  return NextResponse.json({ msg: "Parola ta a fost resetată cu succes" });
}
