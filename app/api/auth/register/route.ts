import dbConnect from "@/lib/dbConnect";
import User from "@/common/models/User";
import bcrypt from "bcrypt";
import { sendEmail } from "@/common/utils/email/sendEmail";
import { emailRegEx, passwordRegEx, usernameRegEx } from "@/common/Constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();

  if (!emailRegEx.test(body.email)) {
    return NextResponse.json(
      { error: "Adresă de e-mail invalidă" },
      {
        status: 400,
      }
    );
  }

  let user: any;

  user = await User.findOne({
    email: body.email,
  });

  if (user) {
    return NextResponse.json(
      { error: "Adresă de e-mail deja folosită" },
      {
        status: 400,
      }
    );
  }

  user = await User.findOne({
    username: body.username,
  });

  if (user) {
    return NextResponse.json(
      { error: "Nume de utilizator deja folosit" },
      {
        status: 400,
      }
    );
  }

  if (!usernameRegEx.test(body.username)) {
    return NextResponse.json(
      { error: "Nume de utilizator fără _ sau ." },
      {
        status: 400,
      }
    );
  }

  if (!passwordRegEx.test(body.password)) {
    return NextResponse.json(
      {
        error:
          "Parola trebuie să conțină o literă, o cifră și un caracter special",
      },
      {
        status: 400,
      }
    );
  }

  if (body.password !== body.cpassword) {
    return NextResponse.json(
      {
        error: "Parola și parola de confirmare nu se potrivesc",
      },
      {
        status: 400,
      }
    );
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

      return NextResponse.json({ msg: "Contul tău a fost creat cu succes" });
    })
    .catch((err: string) => {
      return NextResponse.json(
        { error: "Error on '/api/register': " + err },
        {
          status: 400,
        }
      );
    });
}
