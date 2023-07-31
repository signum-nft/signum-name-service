import { ConfirmedTransaction } from "@signumjs/wallets";
import { HttpError } from "@signumjs/http";

export class LedgerError extends Error {}

type LedgerCallFunction<T> = (...args: any[]) => Promise<T>;

export async function handleError<T = string | ConfirmedTransaction>(
  fn: LedgerCallFunction<T>
) {
  try {
    return await fn();
  } catch (e) {
    console.error(e);
    let message = "didNotWork";

    if (e instanceof HttpError) {
      message += ` - Signum Ledger returned: ${e.message}`;
      // TODO: see how to go on here... in terms of error handling... how to treat them all
      if (e.data.errorCode === 6) message = "insufficientFunds";
    }
    throw new LedgerError(message);
  }
}
