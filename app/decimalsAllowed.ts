export const decimalsAllowed = (value: string, decimals: number) => {
  if (!value) return;

  const decimalsPattern = new RegExp("^\\d+(\\.\\d{0," + decimals + "})?$", "");

  return !decimalsPattern.test(value);
};
