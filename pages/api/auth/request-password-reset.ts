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

  let user: any;

  const email = JSON.parse(req.body);

  // @ts-ignore
  user = await User.findOne({
    email: email,
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
  }

  //@ts-ignore
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${process.env.CLIENT_URL}/password-reset?token=${resetToken}&id=${user._id}`;
  await sendEmail(
    user.email,
    "Resetare Parolă",
    { name: user.name, link: link },
    "../../../../../common/utils/email/template/requestResetPassword.handlebars"
  );
  console.log("exiting api request");
  res.status(200).json({ msg: "Mail sent succesfully" });
}
