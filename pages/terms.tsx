import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { Terms } from "@/features/legal/terms";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}
export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOMetaTags
        clientSideTitle={`${t("termsOfService")} • Signum Name System`}
      />
      <Terms />
    </>
  );
}
