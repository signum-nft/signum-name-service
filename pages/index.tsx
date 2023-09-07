import { Home } from "@/features/home";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { WithBreadcrumbs } from "@/app/components/Layout/components/Breadcrumbs";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function HomePage() {
  return (
    <WithBreadcrumbs breadcrumbs={[]}>
      <Home />
    </WithBreadcrumbs>
  );
}
