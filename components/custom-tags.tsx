import { X } from "lucide-react";
import React from "react";

interface CustomTagProps {
  value: string;
  id: string;
  handleRemoveTag?: (id: string) => void;
  hideIcon?: boolean;
}

const CustomTags = ({
  value,
  id,
  handleRemoveTag,
  hideIcon = false,
}: CustomTagProps) => {
  return (
    <span
      key={id}
      className="bg-mystic-700 text-[14px] text-white px-3 py-1 rounded-full flex items-center gap-2 break-words border-[1px] border-mystic-600"
    >
      {value}

      <button
        type="button"
        onClick={() => {
          if (handleRemoveTag) {
            handleRemoveTag(id);
          }
        }}
        className="cursor-pointer p-0.5 hover:bg-mystic-600  hover:rounded-full"
      >
        {!hideIcon ? <X size={16} /> : null}
      </button>
    </span>
  );
};

export default CustomTags;
