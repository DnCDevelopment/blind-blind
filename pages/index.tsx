import { NextPage, GetServerSideProps } from 'next';

import MainCarousel from '../src/components/MainCarousel/MainCarousel';
import Seo from '../src/components/Seo/Seo';
import MainCollectionsSamples from '../src/components/MainCollectionsSamples/MainCollectionsSamples';
import MainStreetStyleSamples from '../src/components/MainStreetStyleSamples/MainStreetStyleSamples';
import Celebrities from '../src/components/Celebrities/Celebrities';

import { IIndexPageProps } from '../src/pagesTypes';
import {
  ICockpitCarousel,
  ICockpitCelebrityRaw,
  ICockpitGoodsRaw,
  ICockpitRunwaysAndLookbooksRaw,
} from '../src/cockpitTypes';

import {
  getCockpitCollection,
  getCockpitCollections,
} from '../src/utils/getCockpitData';

import { SEO_ITEMS } from '../src/constants/seoItems';

const IndexPage: NextPage<IIndexPageProps> = ({
  carousel,
  goods,
  celebrities,
  streetStyle,
  locale,
}) => (
  <main className="main-page">
    <Seo
      title={SEO_ITEMS[locale].indexPage.title}
      description={SEO_ITEMS[locale].indexPage.title}
      breadcrumbs={[
        {
          title: SEO_ITEMS[locale].indexPage.breadcrumbName,
          link: SEO_ITEMS[locale].indexPage.link,
        },
      ]}
      lang={locale}
      path={process.env.NEXT_PUBLIC_SITE_URL + SEO_ITEMS[locale].indexPage.link}
    />
    <MainCarousel carousel={carousel} />
    <MainCollectionsSamples goods={goods} />
    <MainStreetStyleSamples photos={streetStyle} />
    <Celebrities celebrities={celebrities} />
  </main>
);

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const collectionNames = ['mainCarousel', 'Celebrities'];
  const [cockpitDataCarousel, cockpitDataCelebrities] =
    await getCockpitCollections(collectionNames);

  const filter = `filter[link]=/street-style&populate=1`;
  const cockpitDataRunways = await getCockpitCollection('Runways', filter);

  const getGoods = getCockpitCollection.bind(undefined, 'Goods');
  const collectionFiter = 'filter[onMain]=true&simple=true';
  const collection = await getCockpitCollection('Collections', collectionFiter);
  const goodsFilter = `limit=3${
    collection.length ? `&filter[collection._id]=${collection[0]._id}` : ''
  }&sort[_created]=-1`;
  const cockpitDataGoods = await getGoods(goodsFilter);
  if (cockpitDataGoods.total === 0) {
    const goodsFilter = `populate=1&sort[collection._id]=-1&sort[_created]=-1&limit=3`;
    let cockpitDataGoods = await getGoods(goodsFilter);
    if (cockpitDataGoods.total === 0) {
      const goodsFilter = 'limit=3&sort[_created]=-1';
      cockpitDataGoods = await getGoods(goodsFilter);
    }
  }

  const curRunway: ICockpitRunwaysAndLookbooksRaw = cockpitDataRunways.total
    ? cockpitDataRunways.entries[0]
    : null;

  const carousel = cockpitDataCarousel.entries.map((el: ICockpitCarousel) => {
    return {
      title: el.title,
      link: el.link,
      image: el.image,
    };
  });

  const goods = cockpitDataGoods.entries.map((el: ICockpitGoodsRaw) => {
    return {
      title: locale === defaultLocale ? el.title : el.title_en,
      link: el.link,
      description:
        locale === defaultLocale ? el.description : el.description_en,
      previewImage: el.previewImage,
      secondImage: el.secondImage,
      collectionId: el.collection._id,
      _modified: el._modified,
      _id: el._id,
    };
  });

  const celebrities = cockpitDataCelebrities.entries
    .map((el: ICockpitCelebrityRaw) => {
      return {
        name: locale === defaultLocale ? el.name : el.name_en,
        proffesion: locale === defaultLocale ? el.proffesion : el.proffesion_en,
        photo: el.photo,
      };
    })
    .reverse()
    .slice(0, 3);

  return {
    props: {
      carousel,
      goods,
      celebrities: celebrities,
      streetStyle: curRunway.photos
        .reverse()
        .slice(0, 3)
        .map((photo) => photo.path),
      locale,
    },
  };
};

export default IndexPage;
