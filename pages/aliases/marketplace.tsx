import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { AliasMarketplace } from "@/features/alias/marketplace";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function AliasMarketplacePage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOMetaTags clientSideTitle={`${t("aliasMarketplace")} • SignumSwap`} />
      <AliasMarketplace />
    </>
  );
}
