import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { Privacy } from "@/features/legal/privacy";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOMetaTags
        clientSideTitle={`${t("privacyPolicy")} • Signum Name Service`}
      />
      <Privacy />
    </>
  );
}
