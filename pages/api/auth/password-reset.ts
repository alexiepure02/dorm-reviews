// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../common/models/User";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendEmail } from "../../../common/utils/email/sendEmail";
import Token from "@/common/models/Token";

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }
  await dbConnect();
  const body = JSON.parse(req.body);
  console.log("body: " + body);

  //@ts-ignore
  let passwordResetToken = await Token.findOne({ userId: body.userId });

  if (!passwordResetToken) {
    res.status(400).json({ error: "Invalid or expired password reset token" });
  }

  const isValid = await bcrypt.compare(body.token, passwordResetToken.token);
  if (!isValid) {
    res.status(400).json({ error: "Invalid or expired password reset token" });
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

  //@ts-ignore
  const user = await User.findById({ _id: body.userId });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "../../../../../common/utils/email/template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  res.status(200).json({ msg: "Password Reset Successfully" });
}
