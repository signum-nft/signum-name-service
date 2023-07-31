import { RoadmapPage } from "@/features/exceptions/roadmap";
import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

export async function getStaticProps({ locale }: GetServerSidePropsI18N) {
  return withTranslations(locale)();
}

export default function Custom404() {
  return <RoadmapPage />;
}
