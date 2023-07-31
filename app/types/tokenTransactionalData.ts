export interface TokenTransactionalData {
  priceNQT: string;
  maximumSupplyQNT: string;
  circulatingSupplyQNT: string;
  numberOfTrades: number;
  numberOfHolders: number;
  numberOfTransfers: number;
  volumeQNT: string;
  priceHighNQT: string;
  priceLowNQT: string;
  priceOpenNQT: string;
  priceCloseNQT: string;
}

export const DefaultTransactionalData: TokenTransactionalData = {
  priceNQT: "",
  circulatingSupplyQNT: "0",
  maximumSupplyQNT: "0",
  numberOfTrades: 0,
  numberOfHolders: 0,
  numberOfTransfers: 0,
  volumeQNT: "0",
  priceHighNQT: "0",
  priceLowNQT: "0",
  priceOpenNQT: "0",
  priceCloseNQT: "0",
};
