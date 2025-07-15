import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import type { ReactNode } from "react";

interface props {
  icon?: ReactNode;
  children: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "lg" | "sm" | "icon";
  isPending?: boolean;
  ref?: React.LegacyRef<HTMLButtonElement>;
}

const IconButton = ({
  icon,
  children,
  onClick,
  className,
  type,
  disabled,
  variant,
  size,
  isPending,
  ref,
}: props) => {
  // console.log(variant);

  return (
    <Button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      type={type}
      variant={variant}
      size={size}
      className={`flex items-center justify-center gap-2 min-w-[150px] ${className}`}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : icon}
      <span className="w-[max-content]">{children}</span>
    </Button>
  );
};

export default IconButton;
