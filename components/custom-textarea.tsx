import { cn } from "@/lib/utils";
import React, { TextareaHTMLAttributes } from "react";

type CustomTextAreaProps = {
  value: string;
  label?: string;
  className?: string;
  inputClassName?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const CustomTextArea = ({
  label,
  className = "",
  inputClassName = "",
  value,
  ...props
}: CustomTextAreaProps) => {
  return (
    <div className={`max-w-lg w-full space-y-2 flex flex-col ${className}`}>
      {label && (
        <label htmlFor="" className="text-neutral-300 text-lg font-semibold">
          {label}
        </label>
      )}
      <textarea
        value={value}
        className={cn("bg-mystic-700 rounded-md px-3 py-3 placeholder:text-mystic-500 border border-mystic-300 outline-none text-white" , inputClassName )}
        {...props}
      />
    </div>
  );
};

export default CustomTextArea;
