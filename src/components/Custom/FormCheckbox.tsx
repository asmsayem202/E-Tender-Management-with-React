import { CheckIcon } from "lucide-react";

interface props {
  label?: string;
  detail?: string;
  id?: string;
  onClick?: () => void;
  checked?: boolean;
  size?: string;
}

const FormCheckbox = ({ label, detail, id, onClick, checked, size }: props) => {
  return (
    <div
      onClick={onClick}
      className={`${detail ? "items-start" : "items-center"} flex space-x-2`}
    >
      <div
        className={`${checked ? "bg-primary/70" : "bg-white"} rounded-sm ${
          size || "size-5"
        } flex items-center justify-center border border-solid border-primary`}
      >
        <CheckIcon size={15} className="text-white" />
      </div>
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label
            htmlFor={id}
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {detail && (
          <p className="cursor-pointer text-sm text-muted-foreground w-[max-content]">
            {detail}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormCheckbox;
