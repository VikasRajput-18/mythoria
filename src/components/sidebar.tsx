"use client";

import { SIDEBAR_OPTIONS } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 w-[350px] px-8 py-16">
      <h1 className="text-3xl lg:text-4xl font-bold text-white">Mythoria</h1>
      <div className="mt-8 space-y-5">
        {SIDEBAR_OPTIONS.map((item) => {
          const { icon: Icon } = item;
          const isActive = pathname.includes(item.href);
          console.log(isActive);
          return (
            <Link
              href={item.href}
              key={item.key}
              className={`flex items-center transition-all duration-200 ease-in-out rounded-md px-3 py-3 hover:bg-mystic-400 gap-2 cursor-pointer ${
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
