import { useRouteError } from 'react-router-dom';

type CustomError = Error & {
  statusText?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as CustomError;
  //   console.error(error);

  return (
    <div
      id="error-page"
      className="h-[400px] max-w-3xl mx-auto flex items-center"
    >
      <div className="flex flex-col items-center justify-center rounded-md border p-4">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
