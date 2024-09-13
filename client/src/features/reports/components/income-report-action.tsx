import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ErrorComponent } from '@/components/ui/basic-alert';
import FormGroup from '@/components/ui/form-group';
import { Label } from '@/components/ui/label';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useFetchVoteheads } from '@/features/voteheads/hooks/use-fetch-voteheads';
import { useSetReportParams } from '@/hooks/use-set-report-parameters';
import type {
  IncomeReportParams,
  IncomeReportType,
} from '@/features/reports/types';

const schema = z
  .object({
    from: z.string().min(1, 'Select date'),
    to: z.string().min(1, 'Select date'),
    votehead: z.string().optional(),
    reportType: z.enum(['all', 'by-votehead'], {
      required_error: 'Select report type',
    }),
  })
  .superRefine(({ from, to, reportType, votehead }, ctx) => {
    if (reportType === 'by-votehead' && !votehead) {
      ctx.addIssue({
        code: 'custom',
        message: 'Select votehead',
        path: ['votehead'],
      });
    }
    if (from && to && from > to) {
      ctx.addIssue({
        code: 'custom',
        message: 'From date cannot be greater than to date',
        path: ['from'],
      });
    }
  });

export default function IncomeReportAction() {
  const [searchParams] = useSearchParams();
  const { error, isLoading, voteheads } = useFetchVoteheads('INCOME');
  const setReportParams = useSetReportParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<IncomeReportParams>({
    defaultValues: {
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      votehead: searchParams.get('votehead') || undefined,
      reportType:
        (searchParams.get('reportType') as IncomeReportType) || undefined,
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: IncomeReportParams) {
    setReportParams(values, Object.keys(values));
  }

  return (
    <div className="space-y-4">
      {error && <ErrorComponent error={error.message} />}
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <FormGroup className="col-span-full md:col-span-3">
            <Label>Report Type</Label>
            <Controller
              control={control}
              name="reportType"
              render={({ field }) => (
                <CustomSearchSelect
                  options={[
                    { value: 'all', label: 'All Incomes' },
                    { value: 'by-votehead', label: 'By Votehead' },
                  ]}
                  value={field.value}
                  onChange={(value: string) => {
                    field.onChange(value);
                    setValue('votehead', undefined);
                  }}
                />
              )}
            />

            {errors.reportType && (
              <p className="text-red-500 text-sm">
                {errors.reportType.message}
              </p>
            )}
          </FormGroup>
          <FormGroup className="col-span-full md:col-span-3">
            <Label>Votehead</Label>
            <Controller
              control={control}
              name="votehead"
              render={({ field }) => (
                <CustomSearchSelect
                  options={voteheads}
                  value={field.value}
                  enableClear={false}
                  onChange={field.onChange}
                  disabled={
                    isLoading ||
                    watch('reportType') === 'all' ||
                    !watch('reportType')
                  }
                />
              )}
            />
            {errors.votehead && (
              <p className="text-red-500 text-sm">{errors.votehead.message}</p>
            )}
          </FormGroup>
          <FormGroup className="col-span-full md:col-span-3">
            <Label>From</Label>
            <Input type="date" {...register('from')} />
            {errors.from && (
              <p className="text-red-500 text-sm">{errors.from.message}</p>
            )}
          </FormGroup>
          <FormGroup className="col-span-full md:col-span-3">
            <Label>To</Label>
            <Input type="date" {...register('to')} />
            {errors.to && (
              <p className="text-red-500 text-sm">{errors.to.message}</p>
            )}
          </FormGroup>
        </div>
        <Button className="self-start" onClick={() => {}}>
          Preview
        </Button>
      </form>
    </div>
  );
}
