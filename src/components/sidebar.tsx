"use client";

import { SIDEBAR_OPTIONS } from "@/constants/constants";
import { useAppContext } from "@/context/app-context";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { openSidebar, toggleSidebar } = useAppContext();
  const sidebarRef = useRef<HTMLDivElement>(null);

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
        `fixed -left-[400px] bg-mystic-800 md:sticky transition-all duration-200 ease-in-out top-0 w-[350px] p-8`,
        openSidebar ? "left-0  h-screen z-[999]" : "h-screen"
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl lg:text-4xl font-bold text-white">Mythoria</h1>
        <X
          className="stroke-white md:hidden cursor-pointer hover:scale-95 transition-all duration-200 ease-in-out"
          onClick={toggleSidebar}
        />
      </div>
      <div className="mt-8 space-y-5">
        {SIDEBAR_OPTIONS.map((item) => {
          const { icon: Icon } = item;
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.key}
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
    </aside>
  );
};

export default Sidebar;
