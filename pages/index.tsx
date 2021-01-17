import { NextPage, GetServerSideProps } from 'next';

import Header from '../src/components/Header/Header';

import { indexContext } from '../src/context/cockpitContext';

import { IIndexPageProps } from '../src/pagesTypes';
import {
  ICockpitCollectionsRaw,
  ICockpitRunwaysAndLookbooksRaw,
} from '../src/cockpitTypes';

import { getCockpitCollections } from '../src/utils/getCockpitData';
import MainCarousel from '../src/components/MainCarousel/MainCarousel';
import { ICockpitCarousel } from '../src/cockpitTypes';

const IndexPage: NextPage<IIndexPageProps> = ({
  collections,
  lookbooks,
  runways,
  carousel,
}) => {
  return (
    <indexContext.Provider
      value={{
        collectionsData: collections,
        runwaysData: runways,
        lookbooksData: lookbooks,
      }}
    >
      <main className="main-page">
        <Header />
        <MainCarousel carousel={carousel}></MainCarousel>
      </main>
    </indexContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const collectionNames = [
    'Collections',
    'Runways',
    'Lookbooks',
    'mainCarousel',
  ];
  const [
    cockpitDataCollections,
    cockpitDataRunways,
    cockpitDataLookbooks,
    cockpitDataCarousel,
  ] = await getCockpitCollections(collectionNames);

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

  const carousel = cockpitDataCarousel.entries.map((el: ICockpitCarousel) => {
    return {
      title: el.title,
      link: el.link,
      image: el.image,
    };
  });

  return {
    props: { collections, runways, lookbooks, carousel },
  };
};

export default IndexPage;
