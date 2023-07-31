import { Amount } from "@signumjs/util";

export function calculateAliasFee(payload: string): Amount {
  return Amount.fromSigna(0.2).multiply(
    Math.max(1, Math.ceil(payload.length / 184))
  );
}
