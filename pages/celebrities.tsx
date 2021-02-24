import { GetServerSideProps, NextPage } from 'next';
import { ICockpitCelebrityRaw } from '../src/cockpitTypes';
import Celebrities from '../src/components/Celebrities/Celebrities';
import { ICelebritiesPageProps } from '../src/pagesTypes';
import { getCockpitCollection } from '../src/utils/getCockpitData';

const CelebritiesPage: NextPage<ICelebritiesPageProps> = ({ celebrities }) => (
  <div className="celebrities-page">
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
    },
  };
};

export default CelebritiesPage;
