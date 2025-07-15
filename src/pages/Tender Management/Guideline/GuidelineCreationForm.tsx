import {
  createTenderGuideline,
  getTenderGuideline,
  updateTenderGuideline,
} from "@/api/tender-guideline.api";
import useFetchData from "@/hooks/useFetchData";
import type { TENDER_GUIDELINE } from "@/types/tender-guideline.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, Loader2, SaveIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import TiptapEditor from "@/components/Custom/TipTapEditor";
import { useEditor } from "@tiptap/react";
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
import AlertLoadingModal from "@/components/Custom/AlertLoadingModal";
import IconButton from "@/components/Custom/IconButton";
import { Input } from "@/components/ui/input";

const GuidelineCreationForm = ({ operation }: any) => {
  const navigate = useNavigate();
  const query = useQueryClient();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);

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

  const { data, isLoading } = useFetchData(
    ["tender-guideline", id],
    () => getTenderGuideline(id),
    {
      queryKey: ["tender-guideline", id],
      enabled: !!id,
    }
  );
  const tenderGuideline: TENDER_GUIDELINE | null = data?.data ?? null;

  useEffect(() => {
    if (id && operation === "update") {
      setName(tenderGuideline?.name || "");
      if (editor && tenderGuideline?.formatStructure) {
        editor.commands.setContent(tenderGuideline.formatStructure);
      }
    }
  }, [operation, id, tenderGuideline]);

  const createMutation = useMutation({
    mutationFn: createTenderGuideline,
    onSuccess: () => {
      toast.success("Tender Guideline Create Successful");
      query.invalidateQueries({ queryKey: ["tender-guideline"] });
      navigate(`/dashboard/tender/guideline-list`);
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string; errors: any } };
      };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTenderGuideline,
    onSuccess: () => {
      toast.success("Tender Guideline Update Successful");
      query.invalidateQueries({ queryKey: ["tender-guideline"] });
      navigate(`/dashboard/tender/guideline-list`);
    },
    onError: (error: unknown) => {
      const err = error as {
        response?: { data?: { message?: string; errors: any } };
      };
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  if (operation === "update") {
    if (isLoading)
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
          Loading...
        </div>
      );
  }

  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-3">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-primary font-semibold text-sm cursor-pointer hover:border-b border-primary border-solid w-[max-content] "
        >
          <ArrowLeftIcon size={20} />
          <span>Back</span>
        </div>
        <div>
          <AlertLoadingModal
            open={modal}
            onOpenChange={setModal}
            trigger={
              <IconButton icon={<SaveIcon />}>
                {operation === "create" ? "Save" : "Update"}
              </IconButton>
            }
            title="GuidLine Name"
            description={
              <div className="flex flex-col gap-4">
                <Input
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e?.target?.value)}
                />
              </div>
            }
            actionButton={
              <IconButton
                isPending={createMutation.isPending ?? updateMutation.isPending}
                onClick={() => {
                  if (operation === "create") {
                    createMutation.mutate({
                      name,
                      formatStructure: editor ? editor.getHTML() : "",
                    });
                  } else {
                    updateMutation.mutate({
                      id: id,
                      data: {
                        name,
                        formatStructure: editor ? editor.getHTML() : "",
                      },
                    });
                  }
                }}
                icon={<SaveIcon />}
              >
                {operation === "create" ? "Save" : "Update"}
              </IconButton>
            }
          />
        </div>
      </div>
      <TiptapEditor editor={editor} />
    </React.Fragment>
  );
};

export default GuidelineCreationForm;
