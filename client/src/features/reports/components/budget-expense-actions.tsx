import { useForm, Controller } from 'react-hook-form';

import CustomSearchSelect from '@/components/ui/custom-search-select';
import FormFieldLoading from '@/components/ui/form-field-loading';
import FormGroup from '@/components/ui/form-group';
import { Label } from '@/components/ui/label';
import { ErrorComponent } from '@/components/ui/basic-alert';
import { Button } from '@/components/ui/button';

import { useSetReportParams } from '@/hooks/use-set-report-parameters';
import { useYears } from '@/features/years/hooks/use-years';
import type { BudgetExpenseReportParams } from '@/features/reports/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export default function BudgetExpenseActions() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetExpenseReportParams>({
    defaultValues: {
      yearId: '',
    },
    resolver: zodResolver(
      z.object({
        yearId: z
          .string({ required_error: 'Select financial year.' })
          .min(1, 'Select financial year.'),
      })
    ),
  });
  const { isLoadingYears, years, yearsError } = useYears();
  const setReportParams = useSetReportParams();

  function onSubmit(values: BudgetExpenseReportParams) {
    setReportParams(values, Object.keys(values));
  }

  return (
    <div className="space-y-4">
      {yearsError && <ErrorComponent error={yearsError.message} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {isLoadingYears ? (
          <FormFieldLoading label="Financial Year" className="w-96" />
        ) : (
          <Controller
            control={control}
            name="yearId"
            render={({ field }) => (
              <FormGroup className="w-96">
                <Label>Financial Year</Label>
                <CustomSearchSelect
                  options={years}
                  value={field.value}
                  onChange={field.onChange}
                />
                {errors.yearId && (
                  <p className="text-sm font-medium text-red-500">
                    {errors.yearId.message}
                  </p>
                )}
              </FormGroup>
            )}
          />
        )}
        <Button>Preview</Button>
      </form>
    </div>
  );
}
