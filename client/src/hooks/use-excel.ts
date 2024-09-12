/* eslint-disable @typescript-eslint/no-explicit-any */
import { download, generateCsv, mkConfig } from 'export-to-csv';

export function useExportExcel() {
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  function handleExport(data: any[]) {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  }

  return handleExport;
}
