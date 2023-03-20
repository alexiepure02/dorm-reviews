import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../common/models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "@/common/utils/email/sendEmail";
import { ResponseData } from "@/common/Interfaces";
import { emailRegEx, passwordRegEx, usernameRegEx } from "@/common/Constants";

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

  if (!emailRegEx.test(body.email)) {
    return res.status(400).json({ error: "Adresă de e-mail invalidă" });
  }

  let user: any;

  user = await User.findOne({
    email: body.email,
  });

  if (user) {
    return res.status(400).json({ error: "Adresă de e-mail deja folosită" });
  }

  user = await User.findOne({
    username: body.username,
  });

  if (user) {
    return res.status(400).json({ error: "Nume de utilizator deja folosit" });
  }

  if (!usernameRegEx.test(body.username)) {
    return res.status(400).json({ error: "Nume de utilizator invalid" });
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

  const newUser = new User({
    email: body.email,
    username: body.username,
    password: hashedPassword,
    image: "",
  });

  return newUser
    .save()
    .then(() => {
      sendEmail(
        newUser.email,
        "Cont creat cu succes",
        {
          name: newUser.username,
        },
        "../../../../../common/utils/email/template/accountCreated.handlebars"
      );

      return res.status(200).json({ msg: "Contul tău a fost creat cu succes" });
    })
    .catch((err: string) => {
      return res
        .status(400)
        .json({ error: "Error on '/api/register': " + err });
    });
}
