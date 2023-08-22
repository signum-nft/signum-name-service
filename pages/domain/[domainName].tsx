import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { useTranslation } from "next-i18next";
import { WithConnectedWalletOnly } from "@/features/xtWallet";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { useRouter } from "next/router";
import { Domain } from "@/features/domain";
import { asSingleQueryParam } from "@/app/asSingleQueryParam";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function DomainPage() {
  const { t } = useTranslation();
  const { query } = useRouter();

  const domainName = asSingleQueryParam(query.domainName || "");
  return (
    <WithConnectedWalletOnly redirectUrl="/">
      <SEOMetaTags
        clientSideTitle={`${t("domain_other")} • Signum Name Service`}
      />
      <Domain domainName={domainName} />
    </WithConnectedWalletOnly>
  );
}
