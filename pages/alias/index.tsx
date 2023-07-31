import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { Alias } from "@/features/alias/AliasPage";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function AliasPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOMetaTags clientSideTitle={`${t("alias")} • Signum Name Service`} />
      <Alias />
    </>
  );
}
