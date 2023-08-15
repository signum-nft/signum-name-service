interface AsSubdomainStringArgs {
  subdomain: string;
  domain: string;
  tld?: string;
}
export const asSubdomainString = ({
  tld = "signum",
  subdomain,
  domain,
}: AsSubdomainStringArgs) => `${subdomain}.${domain}:${tld}`;
