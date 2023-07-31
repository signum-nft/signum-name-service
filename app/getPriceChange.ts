export const getPriceChange = (
  dailyClosePrice: number,
  dailyOpenPrice: number
) => {
  if (!dailyClosePrice && !dailyOpenPrice) return 0;
  return (dailyClosePrice / dailyOpenPrice - 1) * 100;
};
