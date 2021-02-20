import { useState } from 'react';
import { useRouter } from 'next/router';

import GoodsItem, { GoodsItemFallback } from './GoodsItem';
import Dropdown from '../Form/Dropdown';

import useCockpit from '../../hooks/useCockpit';

import { ICockpitGoodsEntries, ICockpitGoodsRaw } from '../../cockpitTypes';
import { IGoodsListProps } from './Types';

import { SORT_GOODS, SORT_TRANSLATE } from '../../constants/sortGoods';

const GoodsList: React.FC<IGoodsListProps> = ({ filter }) => {
  const [sortSelect, setSortSelect] = useState<keyof typeof SORT_TRANSLATE>(
    'default'
  );
  const { data: goods } = useCockpit<ICockpitGoodsEntries>(true, filter);
  const { locale } = useRouter();
  const filteredGoods = goods?.entries;

  const sortedGoods = SORT_GOODS[sortSelect](
    filteredGoods as ICockpitGoodsRaw[]
  );

  const setSort = (item: string) => {
    setSortSelect(
      Object.keys(SORT_TRANSLATE).find(
        (key) =>
          SORT_TRANSLATE[key as keyof typeof SORT_TRANSLATE][
            locale as 'ru' | 'en'
          ] === item
      ) as keyof typeof SORT_TRANSLATE
    );
  };

  return (
    <div className="goods-list">
      <div className="input-select">
        <Dropdown
          value={SORT_TRANSLATE[sortSelect][locale as 'ru' | 'en']}
          values={Object.keys(SORT_TRANSLATE).map(
            (key) =>
              SORT_TRANSLATE[key as keyof typeof SORT_TRANSLATE][
                locale as 'ru' | 'en'
              ]
          )}
          setValue={setSort}
        />
      </div>
      <div className="goods-list__goods-container">
        {sortedGoods?.map(
          ({
            _id,
            title,
            price,
            stockPrice,
            link,
            previewImage,
            secondImage,
          }) => (
            <GoodsItem
              key={_id}
              title={title}
              link={link}
              photo={previewImage.path}
              secondPhoto={secondImage.path}
              price={price}
              stockPrice={stockPrice}
            />
          )
        )}
      </div>
    </div>
  );
};

export const GoodsListFallback = () => {
  return (
    <div className="goods-list-fallback">
      <div className="goods-list-fallback__goods-container">
        {Array.from({ length: 9 }, (_, index) => (
          <GoodsItemFallback key={index} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
