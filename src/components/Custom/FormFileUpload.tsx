import { useEffect, useState } from "react";
import { FileUploader, FileInput } from "@/components/ui/file-upload";
import { CloudUpload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  label?: string;
  description?: string;
  form: any; // react-hook-form methods
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  labelIcon?: React.ReactNode;
  disabled?: boolean;
  error?: string;
}

const FormFileUpload = ({
  labelIcon,
  name,
  description,
  form,
  label,
  placeholder,
  isRequired,
  disabled,
  error,
}: Props) => {
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4, // 4MB
    multiple: false,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".gif"],
    },
  };

  // Watch the form field value
  const watchedValue = form.watch(name);

  useEffect(() => {
    if (!watchedValue) {
      setPreview("");
      setFile(null);
      return;
    }

    if (typeof watchedValue === "string") {
      setPreview(watchedValue); // Base64 string or URL
    } else {
      console.warn(`Unexpected value type for ${name}:`, typeof watchedValue);
    }
  }, [watchedValue, name]);

  const handleFileChange = (value: File[] | null) => {
    if (disabled) return;

    const selectedFile = value && value.length > 0 ? value[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      if (
        !["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
          selectedFile.type
        )
      ) {
        toast.error("Please upload a valid image (PNG, JPEG, JPG, or GIF)");
        form.setError(name, { message: "Invalid file type" });
        return;
      }

      form.setValue(name, selectedFile, { shouldValidate: true });

      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      form.setValue(name, "", { shouldValidate: true });
      setPreview("");
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview("");
    form.setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-start font-semibold flex items-start gap-1 text-sm">
        {labelIcon && labelIcon}
        <p className="flex items-start gap-1">
          <span>{label}</span>
          {isRequired && (
            <span className="text-destructive font-semibold">*</span>
          )}
        </p>
      </div>

      <FileUploader
        value={file ? [file] : null}
        onValueChange={handleFileChange}
        dropzoneOptions={dropZoneConfig}
        className="relative bg-background rounded-lg p-2"
      >
        {preview ? (
          <div
            className={cn(
              "group relative rounded-lg border bg-background p-1 transition-all w-[max-content] mx-auto",
              error
                ? "ring-2 ring-destructive/20"
                : "hover:border-muted-foreground/20"
            )}
          >
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className={cn(
                  "absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-opacity group-hover:opacity-100 opacity-0"
                )}
                aria-label="Remove file"
              >
                <Trash2 size={14} />
              </button>
            )}
            <div className="relative overflow-hidden rounded-md">
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-44 object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <FileInput
            id="fileInput"
            className={cn(
              "outline-dashed outline-1 p-2",
              error ? "outline-red-500" : "outline-slate-500"
            )}
          >
            <div className="flex items-center justify-center flex-col p-8 w-full">
              <CloudUpload className="text-gray-500 w-10 h-10" />
              <p className="mb-1 text-sm text-gray-500 text-center">
                <span className="font-semibold">
                  {placeholder || "Click to upload"}
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPEG, JPG, or GIF (max 4MB)
              </p>
            </div>
          </FileInput>
        )}
      </FileUploader>

      {description && <p>{description}</p>}
      {error && (
        <p className="text-destructive text-sm font-semibold">{error}</p>
      )}
    </div>
  );
};

export default FormFileUpload;
