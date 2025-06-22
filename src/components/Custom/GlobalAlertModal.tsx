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

const GlobalAlertModal = ({ mutation }: any) => {
  const selectedId = useGlobalStore((state) => state.selectedId);
  const alertModal = useGlobalStore((state) => state.alertModal);
  const closeAlertModal = useGlobalStore((state) => state.closeAlertModal);
  // console.log("selectedId", selectedId);

  return (
    <AlertDialog open={alertModal} onOpenChange={() => closeAlertModal()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this data?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate(selectedId)}
            disabled={mutation?.isPending}
            isLoading={mutation?.isPending}
            className="w-[80px]"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GlobalAlertModal;
