import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import { useEffect, useState } from "react";

const TiptapEditor = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [html, setHtml] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Bold,
      Italic,
      Underline,
      Heading,
      Link.configure({ openOnClick: false }),
      Image,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Strike,
      CodeBlock,
      Blockquote,
      // LineHeight,
    ],
    content: `<p class='text-gray-200'>Start writing here...</p>`,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[500px] min-w-full",
      },
    },
  });

  useEffect(() => {
    if (!editor) return; // Return void instead of undefined

    const update = () => setHtml(editor.getHTML());
    update();

    editor.on("update", update);
    return () => {
      editor.off("update", update);
    };
  }, [editor]);

  const setLink = () => {
    const url = window.prompt("Enter link URL");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const saveContent = () => {
    if (!editor) return;

    // Get JSON
    const jsonData = editor.getJSON();

    // Or get HTML
    const htmlData = editor.getHTML();

    console.log("Save JSON:", jsonData);
    console.log("Save HTML:", htmlData);

    // send jsonData or htmlData to backend API here
  };
  if (!editor) return null;

  return (
    <div>
      <div className="p-4 border rounded-xl bg-secondary space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 border-b pb-2">
          {/* Basic Styles */}
          <MenuButton
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            label="Bold"
          />
          <MenuButton
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            label="Italic"
          />
          <MenuButton
            isActive={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            label="Underline"
          />
          <MenuButton
            isActive={editor.isActive("highlight")}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            label="Highlight"
          />

          {/* Headings */}
          <MenuButton
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            label="H1"
          />
          <MenuButton
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            label="H2"
          />
          <MenuButton
            isActive={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            label="H3"
          />

          {/* Lists */}
          <MenuButton
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            label="Bullet"
          />
          <MenuButton
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            label="Numbered"
          />

          {/* Links & Image */}
          <MenuButton
            isActive={editor.isActive("link")}
            onClick={setLink}
            label="Link"
          />

          {/* Undo / Redo */}
          <MenuButton
            isActive={false}
            onClick={() => editor.chain().focus().undo().run()}
            label="Undo"
          />
          <MenuButton
            isActive={false}
            onClick={() => editor.chain().focus().redo().run()}
            label="Redo"
          />

          {/* Clear */}
          <MenuButton
            isActive={false}
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            label="Clear"
          />

          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            label="Strike"
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            label="Code"
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            label="Quote"
          />

          {/* Alignment */}
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            label="Left"
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            label="Center"
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            label="Right"
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            label="Justify"
          />
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <EditorContent
              className="rounded-xl bg-secondary text-secondary-foreground p-2 preview-content"
              editor={editor}
              //   className="min-h-[500px] bg-white rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 p-4"
            />
          </div>
        </div>

        {/* <EditorContent editor={editor} className="prose min-w-full margin-0" /> */}
      </div>
      <div className="my-5">
        {/* Button to toggle preview */}
        <div className="flex gap-4 mb-5">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            onClick={saveContent}
            className="px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            Save
          </button>
        </div>
        {/* Conditionally show preview */}
        {showPreview && (
          <div className="p-4 border rounded-lg bg-secondary text-secondary-foreground min-w-full">
            <div
              id="preview-content"
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: html }}
              style={
                {
                  // lineHeight: "1.8",
                  // fontSize: "16px",
                }
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MenuButton = ({ onClick, isActive, label }: any) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-md text-sm ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-secondary-foreground"
    }`}
  >
    {label}
  </button>
);

export default TiptapEditor;
