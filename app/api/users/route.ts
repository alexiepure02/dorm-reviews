import { Role, emailRegEx, usernameRegEx } from "@/common/Constants";
import User from "@/common/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const users = await User.find();

  return NextResponse.json(users);
}

export async function PUT(request: Request) {
  await dbConnect();

  const body = await request.json();

  const initialUser = await User.findById(body._id);

  if (!emailRegEx.test(body.email)) {
    return NextResponse.json(
      { error: "Adresă de e-mail invalidă" },
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

  if (!(body.role === Role.admin || body.role === Role.user)) {
    return NextResponse.json(
      { error: "Rolul trebuie să fie 'admin' sau 'user'" },
      {
        status: 400,
      }
    );
  }

  if (initialUser.email !== body.email) {
    const user = await User.findOne({
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
  }
  if (initialUser.username !== body.username) {
    const user = await User.findOne({
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
  }

  const updatedUser = await User.findByIdAndUpdate(body._id, body);

  return NextResponse.json(updatedUser);
}
