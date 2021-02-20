import { NextPage, GetServerSideProps } from 'next';
import { ICockpitPages } from '../../src/cockpitTypes';
import { IInfomationPageProps } from '../../src/pagesTypes';

import Error from '../_error';

import { getCockpitCollection } from '../../src/utils/getCockpitData';

const SinglePage: NextPage<IInfomationPageProps> = ({ pageProps }) => {
  if (!pageProps) return <Error />;

  return (
    <div
      className="inform-page-container"
      dangerouslySetInnerHTML={{ __html: pageProps.content }}
    />
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
        link: curPage.link,
        content:
          locale === defaultLocale ? curPage.content : curPage.content_en,
      }
    : null;

  return {
    props: {
      pageProps,
    },
  };
};

export default SinglePage;
