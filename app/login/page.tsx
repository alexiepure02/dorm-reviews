"use client";

import Head from "next/head";
// import Layout from '../layout/layout'
import Link from "next/link";
import Image from "next/image";
// import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const router = useRouter();

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (values: {
    email: string;
    password: string;
  }) => {
    console.log("entering on submit.");
    console.log(values.email, values.password);
    const res: any = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    });

    console.log("after signIn");

    res?.error ? console.log(res.error) : redirectToHome();
  };

  const redirectToHome = () => {
    // TODO: redirect to a success register page
    console.log("rediect to home");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Username or email.." {...register("email")} />
        </div>

        <div>
          <input
            type={`${show ? "text" : "password"}`}
            placeholder="Password.."
            {...register("password")}
          />
          <span onClick={() => setShow(!show)}>
            <p>icon2</p>
          </span>
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {/* bottom */}
      <p>
        don't have an account yet? <Link href={"/register"}>Sign Up</Link>
      </p>
    </>
  );
}
