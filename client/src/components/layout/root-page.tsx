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
  className?: string;
  filterComponent?: React.ReactNode;
  searchWithFilter?: boolean;
}

export default function RootPage({
  title,
  description,
  searchPlaceholder,
  hasSearch = true,
  children,
  filterComponent,
  searchWithFilter,
  className,
}: RootPageProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasSearch && !searchWithFilter && (
          <Search placeholder={searchPlaceholder || 'Search...'} />
        )}
        {searchWithFilter && (
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
            <Search placeholder={searchPlaceholder || 'Search...'} />
            {filterComponent}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
