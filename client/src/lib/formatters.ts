import { format, formatDistance } from 'date-fns';

export const flattenErrors = (error: Record<string, string[]>) => {
  return Object.values(error).flat();
};

export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
};

export const formatDateLong = (date: Date | string) => {
  return format(new Date(date), 'PPP');
};

export const dateFormatDistance = (
  date: string | Date,
  addSuffix: boolean = true
) => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix,
  });
};

export const numberFormatter = (value: string | number) => {
  return new Intl.NumberFormat('en-KE', { maximumFractionDigits: 2 }).format(
    Number(value)
  );
};

export const dateFormat = (date: Date | string) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const reportDate = (date: Date | string) => {
  return format(new Date(date), 'dd-MMM-yyyy');
};
