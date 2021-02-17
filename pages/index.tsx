import { NextPage, GetServerSideProps } from 'next';

import MainCarousel from '../src/components/MainCarousel/MainCarousel';
import Seo from '../src/components/Seo/Seo';

import { IIndexPageProps } from '../src/pagesTypes';
import { ICockpitCarousel, ICockpitGoodsRaw } from '../src/cockpitTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

import { getCockpitCollections } from '../src/utils/getCockpitData';
import MainCollectionsSamples from '../src/components/MainCollectionsSamples/MainCollectionsSamples';

const IndexPage: NextPage<IIndexPageProps> = ({ carousel, goods, locale }) => {
  return (
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
        path={SEO_ITEMS[locale].indexPage.link}
      />
      <MainCarousel carousel={carousel}></MainCarousel>
      <MainCollectionsSamples goods={goods} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const collectionNames = ['mainCarousel', 'Goods'];
  const [cockpitDataCarousel, cockpitDataGoods] = await getCockpitCollections(
    collectionNames
  );

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

  return {
    props: { carousel, goods, locale },
  };
};

export default IndexPage;
