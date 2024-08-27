import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export default function FormGroup({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}
