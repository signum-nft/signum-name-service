import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export interface GetServerSidePropsI18N extends GetServerSideProps {
  locale: string;
}

export function withTranslations(locale: string) {
  return async (moreProps: any = {}) => ({
    props: {
      ...(await serverSideTranslations(locale)),
      ...moreProps,
    },
  });
}
