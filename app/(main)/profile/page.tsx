"use client";
import React from "react";
import { useUserContext } from "../../../context/user-context";
import { useAppContext } from "../../../context/app-context";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import ProfileForm from "../../../components/profile-form";

const ProfilePage = () => {
  const { toggleSidebar, openSidebar } = useAppContext();
  const { user } = useUserContext();
  return (
    <div className={cn(`w-full p-4 sm:p-8`, openSidebar && "opacity-30")}>
      <div className="flex items-center gap-2">
        <Menu
          className="stroke-white md:hidden flex-inline cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
          Welcome back, {user?.name}! ✨
        </h1>
      </div>
      <p className="sm:text-lg max-w-2xl text-mystic-500">
        Keep your profile up to date and let readers know more about you — your
        stories begin with you!
      </p>

      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
