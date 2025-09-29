"use client";
import React from "react";
import { useUserContext } from "../../../context/user-context";
import { useAppContext } from "../../../context/app-context";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import ProfileForm from "../../../components/profile-form";
import PageHeader from "../../../components/header/page-header";

const ProfilePage = () => {
  const { toggleSidebar, openSidebar } = useAppContext();
  const { user } = useUserContext();
  return (
    <div className={cn(`w-full p-4 sm:p-8`, openSidebar && "opacity-30")}>
      <PageHeader
        Icon={
          <Menu
            className="stroke-white xl:hidden flex-inline cursor-pointer"
            onClick={toggleSidebar}
          />
        }
        title={`Welcome back, ${user?.name || ""}! ✨`}
        description="Keep your profile up to date and let readers know more about you — your
        stories begin with you!"
      />

      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
