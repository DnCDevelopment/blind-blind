import { GetServerSideProps, NextPage } from 'next';

import Celebrities from '../src/components/Celebrities/Celebrities';
import Seo from '../src/components/Seo/Seo';

import { getCockpitCollection } from '../src/utils/getCockpitData';

import { ICelebritiesPageProps } from '../src/pagesTypes';
import { ICockpitCelebrityRaw } from '../src/cockpitTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

const CelebritiesPage: NextPage<ICelebritiesPageProps> = ({
  celebrities,
  locale,
}) => (
  <div className="celebrities-page">
    <Seo
      title={SEO_ITEMS[locale].celebritiesPage.title}
      description={SEO_ITEMS[locale].celebritiesPage.title}
      breadcrumbs={[
        {
          title: SEO_ITEMS[locale].celebritiesPage.breadcrumbName,
          link: SEO_ITEMS[locale].celebritiesPage.link,
        },
      ]}
      lang={locale}
      path={SEO_ITEMS[locale].celebritiesPage.link}
    />
    <Celebrities celebrities={celebrities} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const cockpitDataCelebrities = await getCockpitCollection('Celebrities');

  const celebrities = cockpitDataCelebrities.entries.map(
    (el: ICockpitCelebrityRaw) => ({
      name: locale === defaultLocale ? el.name : el.name_en,
      proffesion: locale === defaultLocale ? el.proffesion : el.proffesion_en,
      photo: el.photo,
    })
  );

  return {
    props: {
      celebrities,
      locale,
    },
  };
};

export default CelebritiesPage;
