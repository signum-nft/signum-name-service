import { ErrorPage } from "@/features/exceptions/500";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

export async function getStaticProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function Custom500() {
  return <ErrorPage />;
}
