export const flattenErrors = (error: Record<string, string[]>) => {
  return Object.values(error).flat();
};

export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
};
