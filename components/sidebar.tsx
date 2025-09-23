"use client";

import { EllipsisVertical, LogIn, LogOut, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SIDEBAR_OPTIONS } from "../constants/constants";
import { useAppContext } from "../context/app-context";
import { cn } from "../lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useUserContext } from "../context/user-context";

const Sidebar = () => {
  const pathname = usePathname();
  const { openSidebar, toggleSidebar, setOpenSidebar } = useAppContext();
  const { user, logoutMutation } = useUserContext();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    logoutMutation.mutate();
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSidebar, toggleSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        `fixed -left-[400px] bg-mystic-800 xl:sticky transition-all duration-200 ease-in-out top-0 w-[350px] min-w-w-[350px] p-8`,
        openSidebar ? "left-0  h-screen z-[99]" : "h-screen"
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">Mythoria</h2>
        <X
          className="stroke-white xl:hidden cursor-pointer hover:scale-95 transition-all duration-200 ease-in-out"
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex flex-col justify-between mt-8 h-[calc(100vh-150px)]">
        <div className="flex-1 h-full space-y-5">
          {SIDEBAR_OPTIONS.map((item) => {
            const { icon: Icon } = item;
            let isActive = false;

            if (item.href === "/") {
              // Exact match for Home
              isActive = pathname === "/";
            } else {
              // For other routes, match prefix
              isActive = pathname.startsWith(item.href);
            }
            return (
              <Link
                href={item.href}
                key={item.key}
                onClick={() => setOpenSidebar(false)}
                className={`flex items-center no-underline transition-all duration-200 ease-in-out rounded-md px-3 py-3 hover:bg-mystic-400 gap-2 cursor-pointer ${
                  isActive ? "bg-mystic-400" : ""
                }`}
              >
                <Icon className="stroke-white " />
                <p className="text-white">{item.label}</p>
              </Link>
            );
          })}
        </div>
        {!!user ? (
          <div className=" w-full flex items-center  gap-x-4">
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-mystic-blue-900 p-0.5">
                <Image
                  src={user?.profile?.image || "/assets/mythoria.png"}
                  alt={user?.name}
                  width={60}
                  height={60}
                  className="rounded-full  object-cover"
                />
              </div>
              <div className="flex-1 ">
                <p className="text-white truncate max-w-[150px] text-lg font-semibold">
                  {user?.name}
                </p>
                <p className="text-mystic-500 truncate max-w-[150px]">
                  {user?.email}
                </p>
              </div>
            </div>

            <Popover>
              <PopoverTrigger>
                <div className="hover:bg-mystic-400 rounded-full cursor-pointer transition-all duration-200 ease-in-out p-0.5">
                  <EllipsisVertical className="stroke-white" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="z-[100] border-0 shadow-none overflow-hidden">
                <div className="w-full rounded-lg overflow-hidden">
                  <Link
                    href={"/profile"}
                    className="no-underline px-4 p-2 text-white flex items-center gap-2 cursor-pointer w-full h-full  bg-mystic-700  hover:bg-mystic-400 hover:text-white"
                  >
                    <User />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 p-2 text-white flex items-center gap-2 cursor-pointer w-full h-full  bg-mystic-700  hover:bg-mystic-400"
                  >
                    <LogOut />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Link
            href={"/sign-in"}
            onClick={() => setOpenSidebar(false)}
            className={`flex items-center no-underline transition-all duration-200 ease-in-out rounded-md px-3 py-3 hover:bg-mystic-400 gap-2 cursor-pointer`}
          >
            <LogIn className="stroke-white " />
            <p className="text-white">Login</p>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
