import { NextPage, GetServerSideProps } from 'next';

import Header from '../../src/components/Header/Header';

import collectionsContext from '../../src/context/collectionsContext';

import { IIndexPageProps } from '../../src/pagesTypes';
import { ICockpitCollectionsRaw } from '../../src/cockpitTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';

const IndexPage: NextPage<IIndexPageProps> = ({ collections }) => {
  return (
    <collectionsContext.Provider value={{ collectionsData: collections }}>
      <main>
        <Header />
      </main>
    </collectionsContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const cockpitData = await getCockpitCollection('Collections');
  const collections = await cockpitData.entries.map(
    (el: ICockpitCollectionsRaw) => {
      return {
        title: el.title_en,
        link: el.link_en,
      };
    }
  );

  return {
    props: { collections },
  };
};

export default IndexPage;
