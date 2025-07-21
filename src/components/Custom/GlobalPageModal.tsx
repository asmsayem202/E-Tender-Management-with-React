import { type ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2, Minimize2, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/store";

interface props {
  name: string;
  title?: string | ReactNode;
  description?: string;
  buttonStack?: React.ReactNode[];
  children: any;
}

const GlobalPageModal = ({
  name,
  title,
  description,
  buttonStack,
  children,
}: props) => {
  const modal = useGlobalStore((state) => state.modal);
  const closeModal = useGlobalStore((state) => state.closeModal);
  const [isFull, setFull] = useState<boolean>(false);

  if (name === modal) {
    return (
      <Dialog open={name === modal} onOpenChange={() => closeModal()}>
        <DialogContent
          showCloseButton={false}
          className={`w-[95%] sm:w-[70%] sm:h-[70vh] ${
            isFull ? "sm:w-[90%] sm:h-[90vh]" : ""
          } !max-w-none overflow-y-auto bg-card text-card-foreground flex flex-col gap-3 transition-all ease-in-out duration-150 `}
        >
          <DialogHeader className="w-full bg-muted text-muted-foreground mb-0 sticky top-0 z-[99999]">
            <div className="flex items-center justify-between">
              <div className="p-6">
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </div>
              <div className="flex gap-3 m-3 ">
                {buttonStack}
                {isFull ? (
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      setFull(false);
                    }}
                    size={"icon"}
                  >
                    <Minimize2 size={20} />
                  </Button>
                ) : (
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      setFull(true);
                    }}
                    size={"icon"}
                  >
                    <Maximize2 size={20} />
                  </Button>
                )}

                <DialogClose asChild>
                  <Button size={"icon"}>
                    <XIcon />
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>
          <div className="p-5 h-full">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }
};

export default GlobalPageModal;
