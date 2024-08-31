import { type PropsWithChildren } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Search from '@/components/ui/search';

interface RootPageProps extends PropsWithChildren {
  title: string;
  description?: string;
  hasSearch?: boolean;
  searchPlaceholder?: string;
}

export default function RootPage({
  title,
  description,
  searchPlaceholder,
  hasSearch = true,
  children,
}: RootPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasSearch && <Search placeholder={searchPlaceholder || 'Search...'} />}
        {children}
      </CardContent>
    </Card>
  );
}
