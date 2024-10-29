import { NextPage } from "next";
import React from "react";
import { getUserProfileData } from "@/services/profile.service";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const TaskManagement: NextPage = withPageAuthRequired(
  async () => {
    const user = await getUserProfileData();

    return <div>{user.name}</div>;
  },
  { returnTo: "/api/auth/login" },
);

export default TaskManagement;
