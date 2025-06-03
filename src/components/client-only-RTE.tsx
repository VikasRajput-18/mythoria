"use client";

import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const ClientOnlyRTE = ({ placeholder = "Write your own story" }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

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
        backgroundColor: "#1f1c26", // mystic-700
        color: "#ffffff",
      },
      height: 400,
    }),
    [placeholder]
  );
  console.log(content);
  return (
    <>
      <label htmlFor="" className="text-neutral-300 text-lg font-semibold">
        Story Content
      </label>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onChange={(newContent) => setContent(newContent)}
      />
    </>
  );
};

export default ClientOnlyRTE;
