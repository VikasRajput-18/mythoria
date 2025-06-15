"use client";

import { EllipsisVertical, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { useAppContext } from "../context/app-context";
import { SIDEBAR_OPTIONS } from "../constants/constants";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getCurrentUser, logout } from "../api-service/api";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { toast } from "sonner";
import { AxiosError } from "axios";

const Sidebar = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { openSidebar, toggleSidebar } = useAppContext();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
  });
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (pathname !== "/") return router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    },
  });

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
        `fixed -left-[400px] bg-mystic-800 md:sticky transition-all duration-200 ease-in-out top-0 w-[350px] min-w-w-[350px] p-8`,
        openSidebar ? "left-0  h-screen z-[99]" : "h-screen"
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl lg:text-4xl font-bold text-white">Mythoria</h1>
        <X
          className="stroke-white md:hidden cursor-pointer hover:scale-95 transition-all duration-200 ease-in-out"
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex flex-col justify-between mt-8 h-[calc(100vh-150px)]">
        <div className="flex-1 h-full space-y-5">
          {SIDEBAR_OPTIONS.map((item) => {
            const { icon: Icon } = item;
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.key}
                onClick={toggleSidebar}
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
        {!!data?.user && (
          <div className=" w-full flex items-center  gap-x-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/assets/mythoria.png"}
                alt={data?.user?.name}
                width={60}
                height={60}
                className="rounded-full border border-mystic-blue-900 p-0.5 object-cover"
              />
              <div>
                <p className="text-white text-lg font-semibold">
                  {data?.user?.name}
                </p>
                <p className="text-mystic-500">{data?.user?.email}</p>
              </div>
            </div>

            <Popover>
              <PopoverTrigger>
                <div className="hover:bg-mystic-400 rounded-full cursor-pointer transition-all duration-200 ease-in-out p-0.5">
                  <EllipsisVertical className="stroke-white" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="z-[100] bg-mystic-700 max-w-[150px] hover:bg-mystic-400">
                <button
                  onClick={handleLogout}
                  className="px-4 p-2 text-white flex items-center gap-2 cursor-pointer w-full h-full"
                >
                  <LogOut />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
