import { Alert, AlertDescription, AlertTitle } from './alert';

type BasicAlertProps = {
  variant: 'default' | 'destructive' | 'success';
  title: string | undefined;
  description: string | string[];
  className?: string;
};

export default function BasicAlert({
  variant,
  description,
  title,
  className,
}: BasicAlertProps) {
  return (
    <Alert variant={variant} className={className}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {Array.isArray(description) ? (
        <ul>
          {description.map((item, i) => (
            <li key={i}>
              <AlertDescription>👉 {item}</AlertDescription>
            </li>
          ))}
        </ul>
      ) : (
        <AlertDescription>{description}</AlertDescription>
      )}
    </Alert>
  );
}
