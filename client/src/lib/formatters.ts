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
