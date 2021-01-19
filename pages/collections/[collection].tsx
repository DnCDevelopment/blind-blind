import { NextPage, GetServerSideProps } from 'next';
import { Suspense } from 'react';

import Error from '../_error';
import Goods, { GoodsFallback } from '../../src/components/Goods/Goods';

import {
  ICockpitCollectionsRaw,
  ICockpitGoodsEntries,
} from '../../src/cockpitTypes';
import { ICollectionPageProps } from '../../src/pagesTypes';

import { getCockpitCollection } from '../../src/utils/getCockpitData';

import useCockpit from '../../src/hooks/useCockpit';

const fallback = (
  <>
    {Array.from({ length: 9 }, (_, index) => (
      <GoodsFallback key={index} />
    ))}
  </>
);

const CollectionPage: NextPage<ICollectionPageProps> = ({ collection_id }) => {
  const { data: allGoods } = useCockpit<ICockpitGoodsEntries>(
    'collections',
    'Goods'
  );

  if (!collection_id) return <Error />;

  console.log(allGoods);

  return (
    <div className="collection-page">
      <div className="goods-container">
        {allGoods
          ? (() => {
              const filteredGoods = allGoods.entries.filter(
                (goods) => goods.collection._id === collection_id
              );
              return (
                <Suspense fallback={fallback}>
                  {filteredGoods.map(({ _id, title, link, previewImage }) => (
                    <Goods
                      key={_id}
                      title={title}
                      link={link}
                      photo={previewImage.path}
                    ></Goods>
                  ))}
                </Suspense>
              );
            })()
          : fallback}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { collection },
}) => {
  const collections = await getCockpitCollection('Collections');

  const cur_collection = collections.entries.find(
    (el: ICockpitCollectionsRaw) => el.link.slice(1) === collection
  );

  console.log(cur_collection);
  const collection_id = cur_collection ? cur_collection._id : null;

  return {
    props: {
      collection_id,
    },
  };
};

export default CollectionPage;
