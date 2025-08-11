// 'use client';

// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Heading from '@tiptap/extension-heading';
// import Blockquote from '@tiptap/extension-blockquote';
// import Highlight from '@tiptap/extension-highlight';
// import TextAlign from '@tiptap/extension-text-align';

// export default function TiptapEditor() {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Heading.configure({ levels: [1, 2, 3] }),
//       Blockquote,
//       Highlight,
//       TextAlign.configure({
//         types: ['heading', 'paragraph'],
//       }),
//     ],
//     content: '<p>Hello World!</p>',
//   });

//   if (!editor) return null;

//   return (
//     <div className="p-4 border rounded-lg bg-white">
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {/* Basic Styles */}
//         <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">B</button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded italic">I</button>
//         <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-2 py-1 border rounded underline">U</button>

//         {/* Headings */}
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="px-2 py-1 border rounded">H1</button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded">H2</button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="px-2 py-1 border rounded">H3</button>

//         {/* Lists */}
//         <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded">• List</button>
//         <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded">1. List</button>

//         {/* Blockquote */}
//         <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="px-2 py-1 border rounded">“”</button>

//         {/* Highlight */}
//         <button onClick={() => editor.chain().focus().toggleHighlight().run()} className="px-2 py-1 border rounded bg-yellow-200">HL</button>

//         {/* Text Align */}
//         <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="px-2 py-1 border rounded">⬅</button>
//         <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="px-2 py-1 border rounded">⬍</button>
//         <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="px-2 py-1 border rounded">➡</button>
//       </div>

//       {/* Editor */}
//       <EditorContent editor={editor} className="border rounded p-2 min-h-[150px]" />
//     </div>
//   );
// }




// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import TextStyle from "@tiptap/extension-text-style";
// import Color from "@tiptap/extension-color";
// import Placeholder from "@tiptap/extension-placeholder";
// import Image from "@tiptap/extension-image";
// import { useState } from "react";
// import { MdPhotoCameraBack } from "react-icons/md";
// import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";
// import { IoColorPalette } from "react-icons/io5";

// const TiptapEditor = ({ onChange }) => {
//   const [content, setContent] = useState("");

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       TextStyle,
//       Color.configure({ types: ["textStyle"] }),
//       Image.configure({
//         inline: true,
//         allowBase64: true,
//       }),
//       Placeholder.configure({
//         placeholder: "✍️ Share your thoughts, add photos, or tell a story...",
//       }),
//     ],
//     content: "",
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       setContent(html);
//       onChange(html);
//     },
//   });

//   if (!editor) return null;

//   // Handle image upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         editor.chain().focus().setImage({ src: reader.result }).run();
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="w-full ">
//       {/* Toolbar */}
//       <div className="flex items-center gap-2 bg-white shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)] rounded-lg px-3 py-2 mb-2 border border-gray-200">
//         <button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={`p-2 rounded-md transition ${
//             editor.isActive("bold")
//               ? "bg-gray-200 text-black"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           <b><FaBold /></b>
//         </button>

//         <button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={`p-2 rounded-md transition ${
//             editor.isActive("italic")
//               ? "bg-gray-200 text-black"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           <i><FaItalic /></i>
//         </button>

//         <button
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={`p-2 rounded-md transition ${
//             editor.isActive("underline")
//               ? "bg-gray-200 text-black"
//               : "hover:bg-gray-100"
//           }`}
//         >
//           <u><FaUnderline/></u>
//         </button>

//         {/* Color Picker */}
//         <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
//           <IoColorPalette/>
//           <input
//             type="color"
//             onChange={(e) =>
//               editor.chain().focus().setColor(e.target.value).run()
//             }
//             className="w-6 h-6 border-0 bg-transparent cursor-pointer"
//           />
//         </label>

//         {/* Image Upload Button */}
//         <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
//             <MdPhotoCameraBack/>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//         </label>
//       </div>

//       {/* Editor Content */}
//       <div className="border border-gray-300 bg-blend-luminosity rounded-lg p-3 h-16 overflow-auto focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#3c3c34] transition">
//         <EditorContent editor={editor} />
//       </div>

//     </div>
//   );
// };

// export default TiptapEditor;
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";           // <--- Import Color extension
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Typography from '@tiptap/extension-typography';
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import Code from "@tiptap/extension-code";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";

import { useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";
import { 
  FaBold, FaItalic, FaUnderline, FaCode, FaStrikethrough, FaHighlighter, FaEraser, FaMinus 
} from "react-icons/fa6";
import { IoColorPalette } from "react-icons/io5";  // For color icon

const TiptapEditor = ({ onChange }) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        blockquote: false,
        hardBreak: false,
      }),
      Typography,
      Underline,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),   // <--- Configure Color extension here
      Placeholder.configure({
        placeholder: "✍️ Share your thoughts, add photos, or tell a story...",
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Strike,
      Highlight,
      Code,
      HorizontalRule,
      HardBreak,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange(html);
    },
  });

  if (!editor) return null;

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 bg-white shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)] rounded-lg px-3 py-2 mb-2 border border-gray-200 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md transition ${editor.isActive("bold") ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`}
          aria-label="Bold"
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md transition ${editor.isActive("italic") ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`}
          aria-label="Italic"
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md transition ${editor.isActive("underline") ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`}
          aria-label="Underline"
        >
          <FaUnderline />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md transition ${editor.isActive("strike") ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`}
          aria-label="Strike-through"
        >
          <FaStrikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded-md transition ${editor.isActive("highlight") ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`}
          aria-label="Highlight"
        >
          <FaHighlighter />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded-md transition ${editor.isActive("code") ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`}
          aria-label="Inline Code"
        >
          <FaCode />
        </button>

        <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md" aria-label="Color Picker">
          <IoColorPalette />
          <input
            type="color"
            onChange={e => editor.chain().focus().setColor(e.target.value).run()}
            className="w-6 h-6 border-0 bg-transparent cursor-pointer"
          />
        </label>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Horizontal Rule"
        >
          <FaMinus />
        </button>

        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className=" rounded-md hover:bg-gray-100"
          aria-label="Hard Break (Line Break)"
          title="Insert Line Break (Shift+Enter)"
        >
          ↵
        </button>


        {/* Image Upload */}
        <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md" aria-label="Upload Image">
          <MdPhotoCameraBack />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Editor Content */}
      <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#3c3c34] transition min-h-[100px] overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
