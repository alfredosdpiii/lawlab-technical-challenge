import React from "react";
import Navbar from "@/components/nav/navbar";
import { getUserProfileData } from "@/services/profile.service";

export default async function NavbarWrapper() {
  const user = await getUserProfileData();

  if (!user) {
    return (
      <div>
        <Navbar />
      </div>
    );
  }

  return (
    <div>
      <Navbar {...user} />
    </div>
  );
}
