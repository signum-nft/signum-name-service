import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { MarketService } from "@/app/services/marketService";
import {
  selectTickerSymbol,
  marketActions,
  selectActiveMarketData,
} from "@/app/states/marketState";

import useSWR from "swr";
import differenceInMinutes from "date-fns/differenceInMinutes";

const marketService = new MarketService();

export const MarketInitializer = () => {
  const activeMarketData = useAppSelector(selectActiveMarketData);
  const userTicker = useAppSelector(selectTickerSymbol);
  const dispatch = useAppDispatch();

  useSWR(
    `fetchMarketInformation?${userTicker}`,
    async () => {
      // Check if the last request happened 7 minutes ago
      if (activeMarketData.last_updated) {
        const currentDate = new Date();
        const lastRequestDate = new Date(activeMarketData.last_updated);

        if (differenceInMinutes(currentDate, lastRequestDate) < 7) return;
      }

      const market = await marketService.getMarket(userTicker);

      if (market) {
        dispatch(
          marketActions.updateMarketData({
            ticker: userTicker,
            ...market,
          })
        );
      }
    },
    {
      refreshInterval: 120_000,
      dedupingInterval: 110_000,
    }
  );

  return null;
};
