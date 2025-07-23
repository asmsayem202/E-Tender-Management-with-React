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

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    highlight: false,
    strike: false,
    codeBlock: false,
    blockquote: false,
    bulletList: false,
    orderedList: false,
    heading1: false,
    heading2: false,
    heading3: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
    link: false,
  });

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      setHtml(editor.getHTML());

      setActiveFormats({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        highlight: editor.isActive("highlight"),
        strike: editor.isActive("strike"),
        codeBlock: editor.isActive("codeBlock"),
        blockquote: editor.isActive("blockquote"),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        heading1: editor.isActive("heading", { level: 1 }),
        heading2: editor.isActive("heading", { level: 2 }),
        heading3: editor.isActive("heading", { level: 3 }),
        alignLeft: editor.isActive({ textAlign: "left" }),
        alignCenter: editor.isActive({ textAlign: "center" }),
        alignRight: editor.isActive({ textAlign: "right" }),
        alignJustify: editor.isActive({ textAlign: "justify" }),
        link: editor.isActive("link"),
      });
    };

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    update();

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
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

  const buttonClass = (active: boolean) =>
    `px-3 py-1 rounded-md text-sm transition-colors cursor-pointer ${
      active
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-secondary-foreground hover:bg-accent"
    }`;

  if (!editor) return null;

  return (
    <div>
      <div className="p-4 border rounded-xl bg-secondary space-y-4">
        <div className="sticky top-0 z-10 bg-secondary flex flex-wrap gap-2 border-b pb-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={buttonClass(activeFormats.bold)}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={buttonClass(activeFormats.italic)}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={buttonClass(activeFormats.underline)}
            title="Underline"
          >
            <Underline size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={buttonClass(activeFormats.highlight)}
            title="Highlight"
          >
            <Highlighter size={18} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={buttonClass(activeFormats.heading1)}
            title="H1"
          >
            <Heading1 size={18} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={buttonClass(activeFormats.heading2)}
            title="H2"
          >
            <Heading2 size={18} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={buttonClass(activeFormats.heading3)}
            title="H3"
          >
            <Heading3 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={buttonClass(activeFormats.bulletList)}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={buttonClass(activeFormats.orderedList)}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </button>
          <button
            onClick={setLink}
            className={buttonClass(activeFormats.link)}
            title="Link"
          >
            <Link size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className={buttonClass(false)}
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className={buttonClass(false)}
            title="Redo"
          >
            <Redo size={18} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            className={buttonClass(false)}
            title="Clear"
          >
            <Eraser size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={buttonClass(activeFormats.strike)}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={buttonClass(activeFormats.codeBlock)}
            title="Code Block"
          >
            <Code size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={buttonClass(activeFormats.blockquote)}
            title="Quote"
          >
            <Quote size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={buttonClass(activeFormats.alignLeft)}
            title="Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={buttonClass(activeFormats.alignCenter)}
            title="Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={buttonClass(activeFormats.alignRight)}
            title="Right"
          >
            <AlignRight size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={buttonClass(activeFormats.alignJustify)}
            title="Justify"
          >
            <AlignJustify size={18} />
          </button>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar">
            <EditorContent
              className="rounded-xl bg-secondary text-secondary-foreground p-2 preview-content"
              editor={editor}
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="my-5">
        <div className="flex gap-4 mb-5">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

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

export default TiptapEditor;
