import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";
import { Error404Page } from "@/features/exceptions/404";

export async function getStaticProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function Custom404() {
  return <Error404Page />;
}
