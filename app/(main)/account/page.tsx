"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import ReviewCard from "@/components/ReviewCard";
import ReviewCardsList from "@/components/ReviewCardsList";
import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { IconBaseProps } from "react-icons";
import { BiSearchAlt } from "react-icons/bi";

const Reviews: NextPage = () => {
  const { data: session } = useSession();

  return session ? (
    <div className="flex flex-col gap-6 items-center justify-center h-52">
      <h1>You're logged in as: {session.user?.name}</h1>
      <Button className="w-52" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  ) : (
    <h1>{"You're not logged in."}</h1>
  );
};

export default Reviews;
