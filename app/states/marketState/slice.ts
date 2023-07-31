import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupportedTickerSymbol } from "@/app/types/supportedTickerSymbol";
import { MarketData } from "@/app/types/marketData";

export type MarketDataMap = {
  [ticker: string]: MarketData;
};

export interface MarketState {
  selectedTickerSymbol: string;
  markets: MarketDataMap;
}

const initialState: MarketState = {
  selectedTickerSymbol: SupportedTickerSymbol.USD,
  markets: {},
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    reset: () => initialState,
    updateMarketData: (
      state,
      action: PayloadAction<MarketData & { ticker: string }>
    ) => {
      const { ticker } = action.payload;
      state.markets[ticker] = action.payload;
    },
    setSelectedTickerSymbol: (
      state,
      action: PayloadAction<SupportedTickerSymbol>
    ) => {
      state.selectedTickerSymbol = action.payload;
    },
  },
});

export const { actions: marketActions } = marketSlice;
