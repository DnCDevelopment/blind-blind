import GoodsItem, { GoodsItemFallback } from './GoodsItem';

import { ICockpitGoodsEntries } from '../../cockpitTypes';
import { IGoodsListProps } from './Types';

import useCockpit from '../../hooks/useCockpit';

const GoodsList: React.FC<IGoodsListProps> = ({ filter }) => {
  const { data: goods } = useCockpit<ICockpitGoodsEntries>(true, filter);
  const filteredGoods = goods?.entries;

  return (
    <div className="goods-list">
      <div className="goods-list__goods-container">
        {filteredGoods?.map(
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
