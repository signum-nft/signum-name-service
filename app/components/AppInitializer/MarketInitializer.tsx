import { useAppSelector, useAppDispatch } from "@/states/hooks";
import {
  selectTickerSymbol,
  marketActions,
  selectActiveMarketData,
} from "@/app/states/marketState";

import useSWR from "swr";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { useAppContext } from "@/app/hooks/useAppContext";

const refreshInterval = 5 * 60 * 1000;
export const MarketInitializer = () => {
  const activeMarketData = useAppSelector(selectActiveMarketData);
  const userTicker = useAppSelector(selectTickerSymbol);
  const { Services } = useAppContext();
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

      const market = await Services.Market.getMarket(userTicker);
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
      refreshInterval,
      dedupingInterval: refreshInterval - 10_000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return null;
};
