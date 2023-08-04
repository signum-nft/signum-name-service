import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { Dashboard } from "@/features/dashboard";
import { WithConnectedWalletOnly } from "@/app/withConnectedWalletOnly";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <WithConnectedWalletOnly>
      <SEOMetaTags clientSideTitle={`${t("alias")} • Signum Name Service`} />
      <Dashboard />
    </WithConnectedWalletOnly>
  );
}
