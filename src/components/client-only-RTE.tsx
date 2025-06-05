// components/RTE.tsx
"use client";

import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

import React, { useRef, useMemo } from "react";

interface ClientOnlyRTEProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const ClientOnlyRTE = ({
  placeholder = "Write your own story",
  value,
  onChange,
}: ClientOnlyRTEProps) => {
  const editor = useRef(null);
  // const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      theme: "dark",
      placeholder,
      toolbarAdaptive: false,
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      removeButtons: [
        "source",
        "print",
        "about",
        "video",
        "file",
        "align",
        "indent",
        "outdent",
        "brush",
        "font",
        "fontsize",
        "classSpan",
        "preview",
        "copyformat",
      ],
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "ul",
        "ol",
        "hr",
        "paragraph",
        "image",
        "link",
        "unlink",
        "undo",
        "redo",
        "eraser",
      ],
      style: {
        backgroundColor: "#1f1c26",
        color: "#ffffff",
      },
      height: 400,
    }),
    [placeholder]
  );

  return (
    <div>
      <label className="text-neutral-300 text-lg font-semibold">
        Story Content
      </label>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onChange={(newContent) => {}}
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
};

export default ClientOnlyRTE;
