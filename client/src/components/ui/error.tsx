import { CircleX } from 'lucide-react';

export default function Error({ error }: { error: string }) {
  return (
    <div className="max-w-xl mx-auto bg-rose-200 p-4 flex gap-4 items-center rounded-md">
      <div className="bg-rose-500 p-2 rounded-full">
        <CircleX className="text-rose-50" />
      </div>
      <div>
        <h4 className="text-base font-semibold">Something went wrong!!</h4>
        <p className="text-xs text-muted-foreground">{error}</p>
      </div>
    </div>
  );
}
