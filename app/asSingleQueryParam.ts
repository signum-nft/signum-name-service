export const asSingleQueryParam = (
  value: string | string[] | undefined
): string => {
  if (!value) return "";
  if (Array.isArray(value)) return value[0];
  return value;
};
