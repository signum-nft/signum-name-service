import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { Privacy } from "@/features/legal/privacy";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { WithBreadcrumbs } from "@/app/components/Layout/components/Breadcrumbs";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <WithBreadcrumbs
      breadcrumbs={[
        {
          label: t("privacyPolicy"),
          href: "/privacy",
          icon: "privacy",
        },
      ]}
    >
      <SEOMetaTags
        clientSideTitle={`${t("privacyPolicy")} • Signum Name System`}
      />
      <Privacy />
    </WithBreadcrumbs>
  );
}
