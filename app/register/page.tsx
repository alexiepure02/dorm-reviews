"use client";

import Head from "next/head";
// import Layout from '../layout/layout'
import Link from "next/link";
import Image from "next/image";
// import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
// import { useFormik } from 'formik';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.log("calling api");
    await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("error?", data);
      });
  };

  // async function onSubmit(values) {
  //   const options = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(values),
  //   };

  //   await fetch("http://localhost:3000/api/auth/signup", options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) router.push("http://localhost:3000");
  //     });
  // }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Username" {...register("username")} />
          <span>
            <p>icon1</p>
          </span>
        </div>

        <div>
          <input type="email" placeholder="Email" {...register("email")} />
          <span>
            <p>icon2</p>
          </span>
        </div>

        <div>
          <input
            type={`${show.password ? "text" : "password"}`}
            placeholder="password"
            {...register("password")}
          />
          <span onClick={() => setShow({ ...show, password: !show.password })}>
            <p>icon3</p>
          </span>
        </div>

        <div>
          <input
            type={`${show.cpassword ? "text" : "password"}`}
            placeholder="Confirm Password"
            {...register("cpassword")}
          />
          <span
            onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
          >
            <p>icon4</p>
          </span>
        </div>

        {/* login buttons */}
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>

      <p>
        Have an account? <Link href={"/login"}>Sign In</Link>
      </p>
    </>
  );
}
