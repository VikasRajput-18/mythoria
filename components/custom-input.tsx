import React, { InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type CustomInputProps = {
  value: string;
  label?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const CustomInput = ({
  label,
  className = "",
  value,
  ...props
}: CustomInputProps) => {
  return (
    <div className={cn(`max-w-lg w-full space-y-2 flex flex-col`, className)}>
      {label && (
        <label htmlFor="" className="text-neutral-300 text-sm font-semibold">
          {label}
        </label>
      )}
      <input
        value={value}
        {...props}
        className="bg-mystic-700 rounded-md px-3 py-3 placeholder:text-mystic-500 border border-mystic-300 outline-none text-white text-sm"
      />
    </div>
  );
};

export default CustomInput;
