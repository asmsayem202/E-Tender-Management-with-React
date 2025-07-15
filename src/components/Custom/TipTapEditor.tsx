import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Undo,
  Redo,
  Eraser,
  Strikethrough,
  Code,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

const TiptapEditor = ({ editor }: any) => {
  const [showPreview, setShowPreview] = useState(false);
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (!editor && !showPreview) return; // Return void instead of undefined

    const update = () => setHtml(editor.getHTML());
    update();

    editor.on("update", update);
    return () => {
      editor.off("update", update);
    };
  }, [editor]);

  if (!editor) return null;

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
            label={<Bold size={18} />}
          />

          <MenuButton
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            label={<Italic size={18} />}
          />

          <MenuButton
            isActive={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            label={<Underline size={18} />}
          />

          <MenuButton
            isActive={editor.isActive("highlight")}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            label={<Highlighter size={18} />}
          />

          {/* Headings */}
          <MenuButton
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            label={<Heading1 size={18} />}
          />
          <MenuButton
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            label={<Heading2 size={18} />}
          />
          <MenuButton
            isActive={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            label={<Heading3 size={18} />}
          />

          {/* Lists, Links, Undo/Redo, Clear */}
          <MenuButton
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            label={<List size={18} />}
          />

          <MenuButton
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            label={<ListOrdered size={18} />}
          />

          <MenuButton
            isActive={editor.isActive("link")}
            onClick={setLink}
            label={<Link size={18} />}
          />

          <MenuButton
            isActive={false}
            onClick={() => editor.chain().focus().undo().run()}
            label={<Undo size={18} />}
          />

          <MenuButton
            isActive={false}
            onClick={() => editor.chain().focus().redo().run()}
            label={<Redo size={18} />}
          />

          <MenuButton
            isActive={false}
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            label={<Eraser size={18} />}
          />

          {/* Strike, Code Block, Quote */}
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            label={<Strikethrough size={18} />}
          />

          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            label={<Code size={18} />}
          />

          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            label={<Quote size={18} />}
          />

          {/* Alignment */}
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            label={<AlignLeft size={18} />}
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            label={<AlignCenter size={18} />}
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            label={<AlignRight size={18} />}
          />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            label={<AlignJustify size={18} />}
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
        </div>
        {/* Conditionally show preview */}
        {showPreview && (
          <div className="p-4 border rounded-lg bg-secondary text-secondary-foreground min-w-full">
            <div
              id="preview-content"
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: html }}
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
