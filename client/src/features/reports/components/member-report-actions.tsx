import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import CustomSearchSelect from '@/components/ui/custom-search-select';
import FormGroup from '@/components/ui/form-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import { MEMBER_STATUS } from '@/features/members/utils/utils';
import type {
  MemberReportDetails,
  MemberReportType,
} from '@/features/reports/types';
import { isDateGreaterThan } from '@/features/reports/utils';
import { useSetReportParams } from '@/hooks/use-set-report-parameters';

export default function MemberReport() {
  const [searchParams] = useSearchParams();
  const reportType =
    (searchParams.get('reportType') as MemberReportType) || undefined;

  const [reportDetails, setReportDetails] = useState<MemberReportDetails>({
    reportType,
    status: searchParams.get('status') || undefined,
    from: searchParams.get('from') || undefined,
    to: searchParams.get('to') || undefined,
  });

  const setReportParams = useSetReportParams();

  function handleClick() {
    if (reportDetails.reportType === undefined) {
      toast.error('Please select report type');
      return;
    }

    if (
      reportDetails.reportType === 'by-status' &&
      (reportDetails.status === undefined || reportDetails.status.trim() === '')
    ) {
      toast.error('Please select member status');
      return;
    }
    if (
      reportDetails.reportType === 'by-registration' &&
      (reportDetails.from === undefined || reportDetails.to === undefined)
    ) {
      toast.error('Please select dates');
      return;
    }
    if (
      reportDetails.from &&
      reportDetails.to &&
      isDateGreaterThan(
        new Date(reportDetails.from),
        new Date(reportDetails.to)
      )
    ) {
      toast.error('From date cannot be greater than to date');
      return;
    }
    setReportParams(reportDetails, Object.keys(reportDetails));

    // refetch();
  }

  return (
    <div className="space-y-2">
      <div className="form-grid">
        <FormGroup className="col-span-full md:col-span-3">
          <Label>Report Type</Label>
          <CustomSearchSelect
            options={[
              { value: 'by-status', label: 'By Member Status' },
              { value: 'by-registration', label: 'By Registration Date' },
            ]}
            value={reportDetails.reportType}
            onChange={(value: string) =>
              setReportDetails({ reportType: value as MemberReportType })
            }
          />
        </FormGroup>
        {reportDetails.reportType === 'by-status' && (
          <FormGroup className="col-span-full md:col-span-3">
            <Label>Member Status</Label>
            <CustomSearchSelect
              options={MEMBER_STATUS}
              value={reportDetails.status}
              onChange={(value: string) =>
                setReportDetails(prev => ({ ...prev, status: value }))
              }
            />
          </FormGroup>
        )}
        {reportDetails.reportType === 'by-registration' && (
          <>
            <FormGroup className="col-span-full md:col-span-3">
              <Label>From</Label>
              <Input
                type="date"
                value={reportDetails.from}
                onChange={e =>
                  setReportDetails(prev => ({ ...prev, from: e.target.value }))
                }
              />
            </FormGroup>
            <FormGroup className="col-span-full md:col-span-3">
              <Label>To</Label>
              <Input
                type="date"
                value={reportDetails.to}
                onChange={e =>
                  setReportDetails(prev => ({ ...prev, to: e.target.value }))
                }
              />
            </FormGroup>
          </>
        )}
      </div>
      <Button className="self-start" onClick={handleClick}>
        Preview
      </Button>
    </div>
  );
}
