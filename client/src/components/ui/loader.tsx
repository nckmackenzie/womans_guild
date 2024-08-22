import { LoaderIcon } from 'lucide-react';

export default function Loader({ loadingText }: { loadingText?: string }) {
  return (
    <div className="h-[400px] flex items-center justify-center text-primary">
      <div className="flex flex-col items-center space-y-1">
        <LoaderIcon className="size-6 animate-spin" />
        <p className="text-muted-foreground text-xs italic">
          {loadingText || 'Please Wait...'}
        </p>
      </div>
    </div>
  );
}
