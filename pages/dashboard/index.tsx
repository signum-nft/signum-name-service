import { useTranslation } from "next-i18next";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { Dashboard } from "@/features/dashboard";
import { WithConnectedWalletOnly } from "@/features/xtWallet/withConnectedWalletOnly";
import HomeIcon from "@mui/icons-material/Home";
import DasboardtIcon from "@mui/icons-material/TableChart";
import { WithBreadcrumbs } from "@/app/components/Layout/components/Breadcrumbs";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <WithConnectedWalletOnly redirectUrl="/">
      <SEOMetaTags
        clientSideTitle={`${t("domain_other")} • Signum Name System`}
      />
      <WithBreadcrumbs
        breadcrumbs={[
          { label: t("home"), href: "/", icon: HomeIcon },
          { label: t("dashboard"), href: "/dashboard", icon: DasboardtIcon },
        ]}
      >
        <Dashboard />
      </WithBreadcrumbs>
    </WithConnectedWalletOnly>
  );
}
