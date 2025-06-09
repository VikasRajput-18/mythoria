"use client";
import React from "react";

type Props = {
  value: string;
  onChange: (value: "publish" | "draft") => void;
  label?: string;
};

const CustomToggle = ({ value, onChange, label }: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-neutral-300 text-lg font-semibold">
          {label}
        </label>
      )}
      <div className="flex bg-mystic-800 text-white rounded-lg overflow-hidden border border-mystic-500 w-fit">
        <button
          type="button"
          className={`px-4 py-2 transition-all duration-200 cursor-pointer ${
            value === "draft"
              ? "bg-rose-600 text-white"
              : "hover:bg-mystic-700 text-white"
          }`}
          onClick={() => onChange("draft")}
        >
          Draft
        </button>
        <button
          type="button"
          className={`px-4 py-2 transition-all duration-200 cursor-pointer ${
            value === "publish"
              ? "bg-green-600 text-white"
              : "hover:bg-mystic-700 text-white"
          }`}
          onClick={() => onChange("publish")}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default CustomToggle;
