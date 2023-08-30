import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { useTranslation } from "next-i18next";
import { WithConnectedWalletOnly } from "@/features/xtWallet";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { useRouter } from "next/router";
import { Domain } from "@/features/domain";
import { asSingleQueryParam } from "@/app/asSingleQueryParam";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/TableChart";
import DomainIcon from "@mui/icons-material/Language";
import { WithBreadcrumbs } from "@/app/components/Layout/components/Breadcrumbs";

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
      <WithBreadcrumbs
        breadcrumbs={[
          { label: t("home"), href: "/", icon: HomeIcon },
          { label: t("dashboard"), href: "/dashboard", icon: DashboardIcon },
          { label: domainName, href: "#", icon: DomainIcon },
        ]}
      >
        <Domain domainName={domainName} />
      </WithBreadcrumbs>
    </WithConnectedWalletOnly>
  );
}
