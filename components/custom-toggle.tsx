"use client";
import React from "react";

type ToggleOption<T> = {
  value: T;
  label: React.ReactNode; // Can be text, icon, or both
  activeClassName?: string;
  inactiveClassName?: string;
};

type Props<T> = {
  value: T;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
  label?: string;
};

const CustomToggle = <T extends string>({
  value,
  onChange,
  options,
  label,
}: Props<T>) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-neutral-300 text-lg font-semibold">
          {label}
        </label>
      )}
      <div className="flex bg-mystic-800 text-white rounded-lg overflow-hidden border border-mystic-500 w-fit">
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`px-4 py-2 transition-all duration-200 cursor-pointer ${
                isActive
                  ? option.activeClassName || "bg-white text-black"
                  : option.inactiveClassName || "hover:bg-mystic-700 text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomToggle;
