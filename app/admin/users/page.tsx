"use client";

import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import UserForm from "./UserForm";

export default function UsersPage() {
  const [userId, setUserId] = useState("");

  const handleUserId = (id: string) => setUserId(id);

  return (
    <div className=" flex flex-col items-center gap-4">
      <h1>Selectează un utilizator</h1>
      <SearchInput
        placeholder="Utilizator"
        showLocations={false}
        showUniversities={false}
        showDorms={false}
        showUsers={true}
        setSelectedItem={handleUserId}
      />
      {userId && <UserForm userId={userId} />}
    </div>
  );
}
