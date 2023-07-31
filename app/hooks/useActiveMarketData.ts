import { useAppSelector } from "@/states/hooks";
import { selectActiveMarketData } from "@/app/states/marketState";
import { AllowedTickersSymbol } from "@/app/types/supportedTickerSymbol";

export const useActiveMarketData = () => {
  const activeMarketData = useAppSelector(selectActiveMarketData);

  // @ts-ignore
  const symbol = AllowedTickersSymbol.get(activeMarketData?.ticker || "usd");

  return {
    ...activeMarketData,
    symbol,
    ticker: activeMarketData.ticker.toUpperCase(),
    price: activeMarketData.current_price,
  };
};
