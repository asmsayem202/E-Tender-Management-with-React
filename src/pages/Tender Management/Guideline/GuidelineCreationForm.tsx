import {
  createTenderGuideline,
  getTenderGuideline,
  updateTenderGuideline,
} from "@/api/tender-guideline.api";
import TiptapEditor from "@/components/Custom/TipTapEditor";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/useFetchData";
import { tenderGuidelineSchema } from "@/schema/tender-guideline.schema";
import type { TENDER_GUIDELINE } from "@/types/tender-guideline.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const GuidelineCreationForm = ({ operation }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [formatStructure, setFormatStructure] = useState("");
  const query = useQueryClient();

  const form = useForm({
    resolver: zodResolver(tenderGuidelineSchema),
    defaultValues: {
      name: "",
      formatStructure: "",
    },
  });

  const { data, isLoading } = useFetchData(
    ["tender-guideline", id],
    () => getTenderGuideline(id),
    {
      queryKey: ["tender-guideline", id],
      enabled: id !== null,
    }
  );
  const tenderGuideline: TENDER_GUIDELINE | null = data?.data ?? null;

  useEffect(() => {
    if (operation === "update") {
      form.reset({
        name: tenderGuideline?.name || "",
        formatStructure: tenderGuideline?.formatStructure || "",
      });
    }
  }, [operation, id, tenderGuideline, form]);

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
      const errorObject: any = err.response?.data?.errors;
      for (const property in errorObject) {
        const errorMessage = Object.values(errorObject[property]).join("");
        form.setError(property as any, { message: errorMessage });
      }
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
      const errorObject: any = err.response?.data?.errors;
      for (const property in errorObject) {
        const errorMessage = Object.values(errorObject[property]).join("");
        form.setError(property as any, { message: errorMessage });
      }
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
          <Button>{operation === "update" ? "Update" : "Save"}</Button>
        </div>
      </div>
      <TiptapEditor />
    </React.Fragment>
  );
};

export default GuidelineCreationForm;
