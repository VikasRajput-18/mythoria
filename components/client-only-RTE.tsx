"use client";

import dynamic from "next/dynamic";
import React, { useRef, useMemo } from "react";

// Dynamically import JoditEditor to disable SSR
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

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

      // ✅ Allow upload from local system as base64
      uploader: {
        insertImageAsBase64URI: true,
      },

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
        "image", // ✅ This enables the image upload button
        "link",
        "unlink",
        "undo",
        "redo",
        "eraser",
        "align",
        "source", // ✅ Enable raw HTML source editing
      ],
      style: {
        backgroundColor: "#1f1c26",
      },
      height: 400,
      events: {
        afterPaste: (editor: any) => {
          // wrap selected text as <pre><code>
          const sel = editor?.selection?.sel;
          if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            const selectedText = range.toString();
            const codeNode = editor.createInside.element("code");
            codeNode.setAttribute("class", "language-js");
            codeNode.textContent = selectedText;

            const preNode = editor.createInside.element("pre");
            preNode.appendChild(codeNode);

            range.deleteContents();
            range.insertNode(preNode);
          }
        },
        beforeGetValueFromEditor: (editor: any) => {
          if (!editor || !editor.editorDocument) return;

          const doc = editor.editorDocument;
          doc.querySelectorAll("pre").forEach((pre: HTMLElement) => {
            if (pre.querySelector("code")) return;
            const code = doc.createElement("code");
            code.className = "language-js";
            code.innerHTML = pre.innerHTML;
            pre.innerHTML = "";
            pre.appendChild(code);
          });
        },
      },
    }),
    [placeholder]
  );

  return (
    <div>
      <label className="text-neutral-300 text-sm font-semibold mb-2 block">
        Story Content
      </label>
    

      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => {
          // Post-process: fix any <pre> to wrap in <code>
          const temp = document.createElement("div");
          temp.innerHTML = newContent;

          temp.querySelectorAll("pre").forEach((pre: HTMLElement) => {
            if (pre.querySelector("code")) return;
            const code = document.createElement("code");
            code.className = "language-js";
            code.innerHTML = pre.innerHTML;
            pre.innerHTML = "";
            pre.appendChild(code);
          });

          onChange(temp.innerHTML);
        }}
      />
    </div>
  );
};

export default ClientOnlyRTE;
