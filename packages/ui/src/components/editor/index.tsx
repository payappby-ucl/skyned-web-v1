"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TaskItem from "@tiptap/extension-task-item";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import HardBreak from "@tiptap/extension-hard-break";
import { EditorToolbar } from "./toolbar/index";

import Selection from "./extensions/selection";

interface Props {
  onChange(html: string): void;
  content?: string;
  className?: string;
  editable?: boolean;
  placeholder?: string;
  invalid: boolean;
}

const Editor: React.FC<Props> = ({
  className,
  content = "",
  editable,
  invalid,
  onChange,
  placeholder,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      Subscript,
      Typography,
      HardBreak,
      Link.configure({
        openOnClick: false,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something …",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskItem.configure({
        nested: true,
      }),
      Selection,
    ],
    parseOptions: {
      preserveWhitespace: "full",
    },
    editorProps: {
      attributes: {
        class: `selection:bg-brand-900/30 dark:selection:bg-brand-900/60 text-foreground font-medium py-8 px-5 mx-auto min-w-0 min-h-56 overflow-y-scroll bg-transparent text-md border-0 focus:border-0 focus:outline-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_blockquote]:p-2 [&_blockquote]:border-foreground [&_blockquote]:border-l-4 [&_a]:text-brand [&_a]:dark:text-brand-secondary [&_a]:underline [&_a]:font-semibold ${className}`,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    content,
    editable,
    injectCSS: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div
      data-slot="editor"
      aria-invalid={invalid}
      className={`border border-input dark:bg-input/30 rounded-md w-full overflow-x-hidden bg-transparent shadow-xs transition-[color,box-shadow] outline-none has-[div.tiptap:disabled]:opacity-50 has-[div.tiptap:disabled]:pointer-events-none has-[div.tiptap:disabled]:cursor-not-allowed has-[div.tiptap:focus-visible]:border-ring has-[div.tiptap:focus-visible]:ring-ring/50 has-[div.tiptap:focus-visible]:ring-[3px] aria-invalid:!ring-destructive/20 aria-invalid:dark:!ring-destructive/40 aria-invalid:!border-destructive`}
    >
      <EditorToolbar
        editor={editor}
        className="hidden overflow-x-scroll md:flex border-b hide-scrollbar"
      />
      <EditorContent editor={editor} />
      <EditorToolbar
        editor={editor}
        className="md:hidden overflow-x-scroll border-t hide-scrollbar gap-2"
      />
    </div>
  );
};

export { Editor };
