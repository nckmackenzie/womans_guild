import { Link } from 'react-router-dom';
import ContentWrapper from '../layout/content-wrapper';
import { Button } from './button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card';

export default function NotFound() {
  return (
    <ContentWrapper title="Not found">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Page Not found</CardTitle>
          <CardDescription>
            The page you are looking for could not be found.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/dashboard">&larr; Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}
