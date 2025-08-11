
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
  FaBold, FaItalic, FaUnderline, FaCode, FaStrikethrough, FaHighlighter, FaMinus 
} from "react-icons/fa6";
import { IoColorPalette } from "react-icons/io5";  // For color icon

const TiptapEditor = ({key, onChange }) => {

  const CustomHighlight = Highlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      color: {
        default: '#b99f88', // your fixed highlight color
        parseHTML: element => element.style.backgroundColor || '#b99f88',
        renderHTML: attributes => {
          return {
            style: `background-color: ${attributes.color}`,
          }
        },
      },
    }
  },
});

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
      CustomHighlight,
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
            className="w-0 h-0 border-0 bg-transparent cursor-pointer"
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

        <button
          onClick={() => {
            editor.chain().focus().clearContent().run();
            setContent("");
            onChange("");
          }}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Clear editor"
        >
          Clear
        </button>
      </div>

      {/* Editor Content */}
      <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#3c3c34] transition min-h-[100px] overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
