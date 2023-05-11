// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/dbConnect";
import User from "@/common/models/user";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendEmail } from "@/common/utils/email/sendEmail";
import Token from "@/common/models/token";
import { emailRegEx } from "@/common/Constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  let user: any;

  const email = await request.json();

  if (!emailRegEx.test(email)) {
    return NextResponse.json(
      { error: "Adresă de e-mail invalidă" },
      { status: 400 }
    );
  }

  user = await User.findOne({
    email: email,
  });

  if (!user) {
    return NextResponse.json(
      { error: "Contul cu adresa de e-mail introdusă nu există" },
      { status: 404 }
    );
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

  return NextResponse.json({ msg: "Mail sent succesfully" });
}
