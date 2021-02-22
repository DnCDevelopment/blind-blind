import { GetServerSideProps, NextPage } from 'next';
import { ICockpitRunwaysAndLookbooksRaw } from '../../src/cockpitTypes';
import Runway from '../../src/components/Runway/Runway';
import { IBlindStylePageProps } from '../../src/pagesTypes';
import { getCockpitCollection } from '../../src/utils/getCockpitData';
import Error from '../_error';

const BlindStylePage: NextPage<IBlindStylePageProps> = ({ runwayProps }) => {
  if (!runwayProps) return <Error />;

  const { title, photos, videoLink } = runwayProps;

  return (
    <div className="blind-style-page">
      <Runway
        title={title}
        photos={photos.map((photo) => photo.path)}
        videoLink={videoLink}
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
        photos: curRunway.photos,
        videoLink: curRunway.videoLink ? curRunway.videoLink : null,
      }
    : null;

  return {
    props: {
      runwayProps,
    },
  };
};

export default BlindStylePage;
