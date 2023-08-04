import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { MyAliases } from "@/features/me/alias";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOMetaTags clientSideTitle={`${t("alias")} • Signum Name Service`} />
      <MyAliases />
    </>
  );
}
