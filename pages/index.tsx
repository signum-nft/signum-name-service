import { Home } from "@/features/home";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function HomePage() {
  return <Home />;
}
