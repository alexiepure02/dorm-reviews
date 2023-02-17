// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../common/models/User";
import bcrypt from "bcrypt";

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

  console.log("entered.", req.body);
  // hash password
  console.log(req.body["password"]);

  const body = JSON.parse(req.body);

  console.log("entered.", body);
  const hashedPassword = await bcrypt.hash(
    body.password,
    process.env.BCRYPT_SALT
  );
  console.log("creating new user.");

  // create new User on MongoDB
  const newUser = new User({
    email: body.email,
    username: body.username,
    password: hashedPassword,
    image: "",
  });
  console.log("saving new user.");
  newUser
    .save()
    .then(() =>
      res.status(200).json({ msg: "Successfuly created new User: " + newUser })
    )
    .catch((err: string) => {
      console.log(err);
      return res
        .status(400)
        .json({ error: "Error on '/api/register': " + err });
    });
}
