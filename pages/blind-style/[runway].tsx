import { GetServerSideProps, NextPage } from 'next';

import Error from '../_error';
import Runway from '../../src/components/Runway/Runway';
import Seo from '../../src/components/Seo/Seo';

import { ICockpitRunwaysAndLookbooksRaw } from '../../src/cockpitTypes';
import { IBlindStylePageProps } from '../../src/pagesTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';
import { DEFAULT_DESCRIPTION, SEO_ITEMS } from '../../src/constants/seoItems';

const BlindStylePage: NextPage<IBlindStylePageProps> = ({
  runwayProps,
  locale,
}) => {
  if (!runwayProps) return <Error />;

  const { title, photos, videoLink, description, link } = runwayProps;

  return (
    <div className="blind-style-page">
      <Seo
        title={title}
        description={description || DEFAULT_DESCRIPTION[locale]}
        breadcrumbs={[
          {
            title: SEO_ITEMS[locale].indexPage.breadcrumbName,
            link: SEO_ITEMS[locale].indexPage.link,
          },
          {
            title: title,
            link: link,
          },
        ]}
        lang={locale}
        path={'/blind-style' + link}
      />
      <Runway
        title={title}
        photos={photos.map((photo) => photo.path)}
        videoLinks={videoLink?.map(({ value }) => value)}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
  query,
}) => {
  const filter = `filter[link]=/${query.runway}&populate=1`;
  const runwayData = await getCockpitCollection('Runways', filter);
  const curRunway: ICockpitRunwaysAndLookbooksRaw = runwayData.total
    ? runwayData.entries[0]
    : null;

  const runwayProps = curRunway
    ? {
        title: locale === defaultLocale ? curRunway.title : curRunway.title_en,
        description: defaultLocale
          ? curRunway.description
          : curRunway.description_en,
        photos: curRunway.photos,
        videoLink: curRunway.videoLink ? curRunway.videoLink : null,
      }
    : null;

  return {
    props: {
      runwayProps,
      locale,
    },
  };
};

export default BlindStylePage;
