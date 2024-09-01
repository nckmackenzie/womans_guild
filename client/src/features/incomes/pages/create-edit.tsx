import ContentWrapper from '@/components/layout/content-wrapper';
import RootPage from '@/components/layout/root-page';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { BackButton } from '@/components/ui/button';
import IncomesForm from '@/features/incomes/components/incomes-form';
import { PageLoader } from '@/components/ui/loader';

import { useFetchSingle } from '@/hooks/use-fetch-single';
import { useTitle } from '@/hooks/use-title';
import { fetchIncome } from '@/features/incomes/api';

export default function CreateEditIncome({ isEdit }: { isEdit?: boolean }) {
  useTitle(isEdit ? 'Edit Income' : 'Create Income');
  const { isLoading, data, error } = useFetchSingle('income', fetchIncome);

  if (isLoading) return <PageLoader loadingText="Fetching income details..." />;
  return (
    <ContentWrapper title={isEdit ? 'Edit Income' : 'Create Income'}>
      <div className="space-y-4">
        <BackButton />
        {error && <ErrorComponent error={error.message} />}
        <RootPage
          title={isEdit ? 'Edit Income' : 'Create Income'}
          description="Provide income information as accurately as possible"
          hasSearch={false}
          className="max-w-3xl mx-auto"
        >
          <IncomesForm isEdit={!!isEdit} data={data?.data} />
        </RootPage>
      </div>
    </ContentWrapper>
  );
}
