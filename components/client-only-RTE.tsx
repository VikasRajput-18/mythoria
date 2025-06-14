// // components/RTE.tsx
// "use client";

// import dynamic from "next/dynamic";

// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// import React, { useRef, useMemo } from "react";

// interface ClientOnlyRTEProps {
//   value: string;
//   onChange: (content: string) => void;
//   placeholder?: string;
// }

// const ClientOnlyRTE = ({
//   placeholder = "Write your own story",
//   value,
//   onChange,
// }: ClientOnlyRTEProps) => {
//   const editor = useRef(null);
//   // const [content, setContent] = useState("");

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       theme: "dark",
//       placeholder,
//       toolbarAdaptive: false,
//       toolbarSticky: false,
//       showCharsCounter: false,
//       showWordsCounter: false,
//       showXPathInStatusbar: false,
//       removeButtons: [
//         "source",
//         "print",
//         "about",
//         "video",
//         "file",
//         "align",
//         "indent",
//         "outdent",
//         "brush",
//         "font",
//         "fontsize",
//         "classSpan",
//         "preview",
//         "copyformat",
//       ],
//       buttons: [
//         "bold",
//         "italic",
//         "underline",
//         "strikethrough",
//         "ul",
//         "ol",
//         "hr",
//         "paragraph",
//         "image",
//         "link",
//         "unlink",
//         "undo",
//         "redo",
//         "eraser",
//       ],
//       style: {
//         backgroundColor: "#1f1c26",
//         color: "#ffffff",
//       },
//       height: 400,
//     }),
//     [placeholder]
//   );

//   return (
//     <div>
//       <label className="text-neutral-300 text-lg font-semibold">
//         Story Content
//       </label>
//       <JoditEditor
//         ref={editor}
//         value={value}
//         config={config}
//         tabIndex={1}
//         onChange={(newContent) => {}}
//         onBlur={(newContent) => onChange(newContent)}
//       />
//     </div>
//   );
// };

// export default ClientOnlyRTE;

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
      <label className="text-neutral-300 text-lg font-semibold mb-2 block">
        Story Content
      </label>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        // ✅ `onBlur` triggers onChange with updated content
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
};

export default ClientOnlyRTE;
