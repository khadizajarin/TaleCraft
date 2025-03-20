"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useState } from "react";

const TiptapEditor = ({ onChange }) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color.configure({ types: ["textStyle"] }), // Enable color extension
    ],
    content: "<p>Start writing here...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange(html); // Pass updated content to parent
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 border border-primary ">
      {/* Toolbar */}
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 border  ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
        >
          <b>B</b>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 border  ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
        >
          <i>I</i>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 border  ${editor.isActive("underline") ? "bg-gray-300" : ""}`}
        >
          <u>U</u>
        </button>

        {/* Text Color Selection */}
        <input
          type="color"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="p-1 w-10 border "
        />
      </div>

      {/* Editor Content */}
      <div className="border p-2 min-h-[100px] ">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
