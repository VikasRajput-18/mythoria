import React, { SelectHTMLAttributes } from "react";

type CustomSelectProps = {
  label?: string;
  className?: string;
  value: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const CustomSelect = ({
  label,
  className = "",
  value,
  children,
  ...props
}: CustomSelectProps) => {
  return (
    <div className={`max-w-lg w-full flex flex-col space-y-2 ${className}`}>
      {label && (
        <label className="text-neutral-300 text-lg font-semibold">
          {label}
        </label>
      )}
      <select
        value={value}
        {...props}
        className="bg-mystic-700 rounded-md px-3 py-4 placeholder:text-mystic-500 border border-mystic-300 outline-none text-white"
      >
        {children}
      </select>
    </div>
  );
};

export default CustomSelect;
