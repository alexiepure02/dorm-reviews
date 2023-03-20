// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../common/models/User";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendEmail } from "../../../common/utils/email/sendEmail";
import Token from "@/common/models/Token";
import { ResponseData } from "@/common/Interfaces";
import { emailRegEx } from "@/common/Constants";

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

  let user: any;

  const email = JSON.parse(req.body);

  if (!emailRegEx.test(email)) {
    return res.status(400).json({ error: "Adresă de e-mail invalidă" });
  }

  user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res
      .status(404)
      .json({ error: "Contul cu adresa de e-mail introdusă nu există" });
  }

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
    { name: user.username, link: link },
    "../../../../../common/utils/email/template/requestResetPassword.handlebars"
  );

  return res.status(200).json({ msg: "Mail sent succesfully" });
}
