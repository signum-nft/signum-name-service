import { Amount } from "@signumjs/util";

export const optionalSigna = (signa: string | number | undefined) =>
  signa ? Amount.fromSigna(signa) : undefined;
