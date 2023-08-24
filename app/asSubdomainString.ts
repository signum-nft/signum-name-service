interface AsSubdomainStringArgs {
  subdomain: string;
  domain: string;
  tld?: string;
}
export const asSubdomainString = ({
  tld = "signum",
  subdomain,
  domain,
}: AsSubdomainStringArgs) =>
  (subdomain
    ? `${subdomain}.${domain}@${tld}`
    : `${domain}@${tld}`
  ).toLowerCase();
