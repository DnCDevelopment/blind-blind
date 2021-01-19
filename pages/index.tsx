import { NextPage, GetServerSideProps } from 'next';

import MainCarousel from '../src/components/MainCarousel/MainCarousel';

import { indexContext } from '../src/context/cockpitContext';

import { IIndexPageProps } from '../src/pagesTypes';
import {
  ICockpitCollectionsRaw,
  ICockpitRunwaysAndLookbooksRaw,
  ICockpitCarousel,
  ICockpitGoodRaw,
} from '../src/cockpitTypes';

import { getCockpitCollections } from '../src/utils/getCockpitData';
import MainCollectionsSamples from '../src/components/MainCollectionsSamples/MainCollectionsSamples';
import Header from '../src/components/Header/Header';

const IndexPage: NextPage<IIndexPageProps> = ({
  collections,
  lookbooks,
  runways,
  carousel,
  goods,
}) => {
  console.log(1);
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
        <MainCollectionsSamples goods={goods} />
      </main>
    </indexContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const collectionNames = [
    'Collections',
    'Runways',
    'Lookbooks',
    'mainCarousel',
    'Goods',
  ];
  const [
    cockpitDataCollections,
    cockpitDataRunways,
    cockpitDataLookbooks,
    cockpitDataCarousel,
    cockpitDataGoods,
  ] = await getCockpitCollections(collectionNames);

  const runways = cockpitDataRunways.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: locale === defaultLocale ? el.link : el.link_en,
      };
    }
  );

  const lookbooks = cockpitDataLookbooks.entries.map(
    (el: ICockpitRunwaysAndLookbooksRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: locale === defaultLocale ? el.link : el.link_en,
      };
    }
  );

  const collections = cockpitDataCollections.entries.map(
    (el: ICockpitCollectionsRaw) => {
      return {
        title: locale === defaultLocale ? el.title : el.title_en,
        link: `collections${el.link}`,
        _id: el._id,
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

  const goods = cockpitDataGoods.entries.map((el: ICockpitGoodRaw) => {
    return {
      title: locale === defaultLocale ? el.title : el.title_en,
      link: locale === defaultLocale ? el.link : el.link_en,
      description:
        locale === defaultLocale ? el.description : el.description_en,
      previewImage: el.previewImage,
      secondImage: el.secondImage,
      collectionId: el.collection._id,
      _modified: el._modified,
      _id: el._id,
    };
  });

  return {
    props: { collections, runways, lookbooks, carousel, goods },
  };
};

export default IndexPage;
