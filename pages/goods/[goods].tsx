import { NextPage, GetServerSideProps } from 'next';
import { ICockpitGoodsRaw, ICockpitSize } from '../../src/cockpitTypes';
import GoodsListTitle from '../../src/components/Goods/GoodsListTitle';
import GoodsSingle from '../../src/components/Goods/GoodsSingle';
import { IGoodsPageProps } from '../../src/pagesTypes';
import { getCockpitCollection } from '../../src/utils/getCockpitData';
import Error from '../_error';

const SingleGoodsPage: NextPage<IGoodsPageProps> = ({ goodsProps }) => {
  if (!goodsProps) return <Error />;

  return (
    <div className="goods-page">
      <GoodsListTitle />
      <GoodsSingle {...goodsProps} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
  query,
}) => {
  const filter = `filter[link]=/${query.goods}&populate=1`;
  const goodsData = await getCockpitCollection('Goods', filter);
  const curGoods: ICockpitGoodsRaw = goodsData.total
    ? goodsData.entries[0]
    : null;

  const goodsProps = curGoods
    ? {
        id: curGoods._id,
        title: locale === defaultLocale ? curGoods.title : curGoods.title_en,
        link: curGoods.link,
        description:
          locale === defaultLocale
            ? curGoods.description
            : curGoods.description_en,
        materials:
          locale === defaultLocale ? curGoods.consist : curGoods.consist_en,
        price: curGoods.price,
        stockPrice: curGoods.stockPrice,
        sizes: (curGoods.sizes as ICockpitSize[]).map((size) => size.size),
        photo: curGoods.previewImage.path,
        secondPhoto: curGoods.secondImage.path,
        otherPhotos: curGoods.otherImages,
        isExclusive: curGoods.isExclusive,
        collectionLink: curGoods.collection.link,
      }
    : null;

  return {
    props: {
      goodsProps,
    },
  };
};

export default SingleGoodsPage;
