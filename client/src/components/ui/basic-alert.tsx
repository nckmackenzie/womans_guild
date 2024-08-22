import { Alert, AlertDescription, AlertTitle } from './alert';

type BasicAlertProps = {
  variant: 'default' | 'destructive' | 'success';
  title: string | undefined;
  description: string | string[];
  className?: string;
};

export function BasicAlert({
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
              <AlertDescription>- {item}</AlertDescription>
            </li>
          ))}
        </ul>
      ) : (
        <AlertDescription>{description}</AlertDescription>
      )}
    </Alert>
  );
}

export function ErrorComponent({
  error,
  showTitle,
  title,
}: {
  error: string | string[] | undefined;
  showTitle?: boolean;
  title?: string;
}) {
  if (!error) return null;
  return (
    <BasicAlert
      title={showTitle ? title : undefined}
      description={
        error ||
        'There was an error while processing your request. Please try again later.'
      }
      variant="destructive"
      className="w-full space-y-4"
    />
  );
}
