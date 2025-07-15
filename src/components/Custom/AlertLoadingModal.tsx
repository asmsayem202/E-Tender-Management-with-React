import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface props {
  trigger?: ReactNode;
  title: string;
  description: string | ReactNode;
  actionButton?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AlertLoadingModal = ({
  trigger,
  title,
  description,
  actionButton,
  open,
  onOpenChange,
}: props) => {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent asChild>
        <div className={`bg-muted text-muted-foreground`}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-muted-foreground">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant={"outline"} className="min-w-[180px]">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>{actionButton}</AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertLoadingModal;
