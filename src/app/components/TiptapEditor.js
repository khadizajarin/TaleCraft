

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useState } from "react";
import { MdPhotoCameraBack } from "react-icons/md";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";
import { IoColorPalette } from "react-icons/io5";

const TiptapEditor = ({ onChange }) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: "✍️ Share your thoughts, add photos, or tell a story...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange(html);
    },
  });

  if (!editor) return null;

  // Handle image upload
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
    <div className="w-full ">
      {/* Toolbar */}
      <div className="flex items-center gap-2 bg-white shadow-md rounded-lg px-3 py-2 mb-2 border border-gray-200">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md transition ${
            editor.isActive("bold")
              ? "bg-gray-200 text-black"
              : "hover:bg-gray-100"
          }`}
        >
          <b><FaBold /></b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md transition ${
            editor.isActive("italic")
              ? "bg-gray-200 text-black"
              : "hover:bg-gray-100"
          }`}
        >
          <i><FaItalic /></i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md transition ${
            editor.isActive("underline")
              ? "bg-gray-200 text-black"
              : "hover:bg-gray-100"
          }`}
        >
          <u><FaUnderline/></u>
        </button>

        {/* Color Picker */}
        <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
          <IoColorPalette/>
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="w-6 h-6 border-0 bg-transparent cursor-pointer"
          />
        </label>

        {/* Image Upload Button */}
        <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
            <MdPhotoCameraBack/>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Editor Content */}
      <div className="border border-gray-300 bg-blend-luminosity rounded-lg p-3 h-16 overflow-auto focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#3c3c34] transition">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
};

export default TiptapEditor;
