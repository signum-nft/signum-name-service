interface AsDomainStringArgs {
  name: string;
  tld?: string;
}
export const asDomainString = ({ tld = "signum", name }: AsDomainStringArgs) =>
  `${name}:${tld}`;
