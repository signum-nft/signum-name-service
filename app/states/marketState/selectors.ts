import { RootState } from "@/states/store";
import { MarketData } from "@/app/types/marketData";
import { SupportedTickerSymbol } from "@/app/types/supportedTickerSymbol";

export const selectTickerSymbol = (state: RootState): SupportedTickerSymbol =>
  SupportedTickerSymbol[
    state.marketState.selectedTickerSymbol.toUpperCase() as keyof typeof SupportedTickerSymbol
  ];

export const selectMarketData =
  (ticker: SupportedTickerSymbol) =>
  (state: RootState): MarketData | null =>
    state.marketState.markets[ticker] || null;

export const selectActiveMarketData = (
  state: RootState
): MarketData & { ticker: string } => {
  const ticker = selectTickerSymbol(state);
  return {
    ticker,
    ...state.marketState.markets[ticker],
  };
};
