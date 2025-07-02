import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGlobalStore } from "@/store/store";
import { Button } from "../ui/button";

const GlobalAlertModal = ({
  mutations,
  data = {},
}: {
  mutations: Record<string, any>;
  data?: Record<string, any>;
}) => {
  const { isOpen, title, description, confirmText, variant, action } =
    useGlobalStore((state) => state.alertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  const selectedId = useGlobalStore((state) => state.selectedId);

  if (!action || !Object.prototype.hasOwnProperty.call(mutations, action))
    return null;

  const mutation = mutations[action];
  const actionPayload = data?.[action] ?? {};

  const isPayloadAction = action !== "delete";

  const handleClick = () => {
    if (!mutation) return;

    if (isPayloadAction) {
      mutation.mutate({ id: selectedId, data: actionPayload });
    } else {
      mutation.mutate(selectedId);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAlertModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={variant}
            onClick={handleClick}
            disabled={mutation?.isPending}
            isLoading={mutation?.isPending}
            className="w-[80px]"
          >
            {confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GlobalAlertModal;
