import { NextPage, GetServerSideProps } from 'next';

import Header from '../src/components/Header/Header';

import { indexContext } from '../src/context/cockpitContext';

import { IIndexPageProps } from '../src/pagesTypes';
import {
  ICockpitCollectionsRaw,
  ICockpitRunwaysAndLookbooksRaw,
} from '../src/cockpitTypes';

import { getCockpitCollection } from '../src/utils/getCockpitData';

const IndexPage: NextPage<IIndexPageProps> = ({
  collections,
  lookbooks,
  runways,
}) => {
  return (
    <indexContext.Provider
      value={{
        collectionsData: collections,
        runwaysData: runways,
        lookbooksData: lookbooks,
      }}
    >
      <main>
        <Header />
      </main>
    </indexContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const cockpitDataCollections = await getCockpitCollection('Collections');
  const cockpitDataRunways = await getCockpitCollection('Runways');
  const cockpitDataLookbooks = await getCockpitCollection('Lookbooks');

  const runways = cockpitDataRunways.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: el.title,
        link: el.link,
      };
    }
  );

  const lookbooks = cockpitDataLookbooks.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: el.title,
        link: el.link,
      };
    }
  );

  const collections = cockpitDataCollections.entries.map(
    (el: ICockpitCollectionsRaw) => {
      return {
        title: el.title,
        link: el.link,
      };
    }
  );

  return {
    props: { collections, runways, lookbooks },
  };
};

export default IndexPage;
