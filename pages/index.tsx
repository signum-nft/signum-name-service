import { Home } from "@/features/home";
// import { GetServerSidePropsI18N, withTranslations } from "@/app/i18n/server";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
// export async function getServerSideProps({ locale }: GetServerSidePropsI18N) {
//   return withTranslations(locale)();
// }

export default function HomePage() {
  return <Home />;
}
