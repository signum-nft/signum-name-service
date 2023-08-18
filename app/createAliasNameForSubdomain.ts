import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);
export function createAliasNameForSubdomain(domain: string): string {
  const id = nanoid();
  return `${domain.substring(0, 24 - id.length + 1)}_${id}`;
}
