import { LoaderIcon } from 'lucide-react';

export default function Loader() {
  return (
    <div className="h-[400px] flex items-center justify-center text-primary">
      <LoaderIcon className="size-6 animate-spin" />
    </div>
  );
}
