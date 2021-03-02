import { NextPage, GetServerSideProps } from 'next';

import Error from './_error';

import Seo from '../src/components/Seo/Seo';

import { ICockpitPages } from '../src/cockpitTypes';
import { IInfomationPageProps } from '../src/pagesTypes';

import { getCockpitCollection } from '../src/utils/getCockpitData';

import { SEO_ITEMS, DEFAULT_DESCRIPTION } from '../src/constants/seoItems';

const SinglePage: NextPage<IInfomationPageProps> = ({ pageProps, locale }) => {
  if (!pageProps) return <Error />;

  return (
    <>
      <Seo
        title={pageProps.title}
        description={pageProps.seoDescription || DEFAULT_DESCRIPTION[locale]}
        breadcrumbs={[
          {
            title: SEO_ITEMS[locale].indexPage.breadcrumbName,
            link: SEO_ITEMS[locale].indexPage.link,
          },
          {
            title: pageProps.title as string,
            link: pageProps.link as string,
          },
        ]}
        lang={locale as 'ru' | 'en'}
        path={pageProps.link as string}
      />
      <div
        className="inform-page-container"
        dangerouslySetInnerHTML={{ __html: pageProps.content }}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
  query,
}) => {
  const filter = `filter[link]=/${query.page}&populate=1`;
  const pagesData = await getCockpitCollection('Pages', filter);
  const curPage: ICockpitPages = pagesData.total ? pagesData.entries[0] : null;

  const pageProps = curPage
    ? {
        title: locale === defaultLocale ? curPage.title : curPage.title_en,
        link: curPage.link,
        content:
          locale === defaultLocale ? curPage.content : curPage.content_en,
        seoDescription:
          locale === defaultLocale
            ? curPage.seoDescription
            : curPage.seoDescription_en,
      }
    : null;

  return {
    props: {
      pageProps,
      locale,
    },
  };
};

export default SinglePage;
