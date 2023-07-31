export type OrderSides = "buy" | "sell";

export type OrderTypes = "market" | "limit";

export interface OrderRowProps {
  type: OrderSides;
  price: string;
  amount: number;
}
