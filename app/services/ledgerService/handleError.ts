import { ConfirmedTransaction } from "@signumjs/wallets";
import { HttpError } from "@signumjs/http";

export class LedgerError extends Error {}

type LedgerCallFunction<T> = (...args: any[]) => Promise<T>;

export async function handleError<T = string | ConfirmedTransaction>(
  fn: LedgerCallFunction<T>
) {
  try {
    return await fn();
  } catch (e: any) {
    console.error(e);
    let message = e.message;
    if (e instanceof HttpError) {
      message = `Signum Ledger returned: ${e.message}`;
    }
    throw new LedgerError(message);
  }
}
