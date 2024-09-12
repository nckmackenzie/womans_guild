import { useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import FormGroup from '@/components/ui/form-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ErrorComponent } from '@/components/ui/basic-alert';

import type {
  ExpenseReportDetails,
  ExpenseReportType,
} from '@/features/reports/types';
import { useFetchVoteheads } from '@/features/voteheads/hooks/use-fetch-voteheads';
import { PAYMENT_METHODS } from '@/features/expenses/utils';
import { useSetReportParams } from '@/hooks/use-set-report-parameters';

const schema = z
  .object({
    from: z.string().min(1, 'Select date'),
    to: z.string().min(1, 'Select date'),
    params: z.string().optional(),
    reportType: z.enum(['all', 'by-votehead', 'by-method'], {
      required_error: 'Select report type',
    }),
  })
  .superRefine(({ from, to, reportType, params }, ctx) => {
    if (reportType !== 'all' && !params) {
      ctx.addIssue({
        code: 'custom',
        message: 'Select one',
        path: ['params'],
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

export default function ExpenseReportAction() {
  const [searchParams] = useSearchParams();
  const { error, isLoading, voteheads } = useFetchVoteheads('EXPENSE');
  const setReportParams = useSetReportParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<ExpenseReportDetails>({
    defaultValues: {
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      params: searchParams.get('params') || undefined,
      reportType:
        (searchParams.get('reportType') as ExpenseReportType) || undefined,
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(values: ExpenseReportDetails) {
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
                    { value: 'all', label: 'All Expenses' },
                    { value: 'by-votehead', label: 'By Votehead' },
                    { value: 'by-method', label: 'By Payment Method' },
                  ]}
                  value={field.value}
                  onChange={(value: string) => {
                    field.onChange(value);
                    setValue('params', undefined);
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
            <Label>
              {watch('reportType') !== 'by-method' ? 'Votehead' : 'Pay Method'}
            </Label>
            <Controller
              control={control}
              name="params"
              render={({ field }) => (
                <CustomSearchSelect
                  options={
                    watch('reportType') === 'by-method'
                      ? PAYMENT_METHODS
                      : voteheads
                  }
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
            {errors.params && (
              <p className="text-red-500 text-sm">{errors.params.message}</p>
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
