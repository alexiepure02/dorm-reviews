// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../common/models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../common/utils/email/sendEmail";
import Token from "@/common/models/Token";
import { ResponseData } from "@/common/Interfaces";
import { passwordRegEx } from "@/common/Constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "This API call only accepts POST methods" });
  }
  await dbConnect();
  const body = JSON.parse(req.body);

  //@ts-ignore
  let passwordResetToken = await Token.findOne({ userId: body.userId });

  if (!passwordResetToken) {
    return res.status(400).json({
      error: "Token de resetare a parolei este invalid sau a expirat",
    });
  }

  const isValid = await bcrypt.compare(body.token, passwordResetToken.token);

  if (!isValid || !passwordResetToken) {
    return res.status(400).json({
      error: "Token de resetare a parolei este invalid sau a expirat",
    });
  }

  if (!passwordRegEx.test(body.password)) {
    return res.status(400).json({
      error:
        "Parola trebuie să conțină o literă, o cifră și un caracter special",
    });
  }

  if (body.password !== body.cpassword) {
    return res.status(400).json({
      error: "Parola și parola de confirmare nu se potrivesc",
    });
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
    "Parolă resetată cu success",
    {
      name: user.username,
    },
    "../../../../../common/utils/email/template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne({ userId: body.userId });
  return res.status(200).json({ msg: "Parola ta a fost resetată cu succes" });
}
