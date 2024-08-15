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
} from '@/components/ui/alert-dialog';

interface CustomAlertDialogProps {
  children: React.ReactNode;
  prompt?: string;
  promptDescription?: boolean;
  description?: string;
  onConfirm?: () => void;
  isPending?: boolean;
}

export function CustomAlertDialog({
  children,
  prompt,
  promptDescription,
  onConfirm,
  description,
  isPending,
}: CustomAlertDialogProps) {
  function handleAction() {
    onConfirm && onConfirm();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {prompt || 'Are you absolutely sure?'}
          </AlertDialogTitle>
          {promptDescription && (
            <AlertDialogDescription>
              {description ||
                'This action cannot be undone. Are you sure you want to proceed?'}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            disabled={isPending}
            className="bg-rose-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
