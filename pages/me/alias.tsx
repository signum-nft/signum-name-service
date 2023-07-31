import { useTranslation } from "next-i18next";
import { MyAliases } from "@/features/me/alias";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";

export default function MyAliasesPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOMetaTags clientSideTitle={`${t("myAlias")} • Signum Name Service`} />
      <MyAliases />
    </>
  );
}
