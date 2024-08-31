import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useNavigate,
} from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || 'Unknown error';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An unknown error occurred';
  }

  return (
    <div id="error-page" className="grid h-screen place-content-center">
      <Card>
        <CardHeader className="p-4">
          <CardTitle>😔An unexpected error has occured</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">Error:{errorMessage}</p>
          <div className="space-x-2">
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            <Button variant={'secondary'} asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
