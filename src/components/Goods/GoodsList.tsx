import { ICockpitGoodsEntries } from '../../cockpitTypes';
import useCockpit from '../../hooks/useCockpit';
import GoodsItem, { GoodsItemFallback } from './GoodsItem';

import { IGoodsListProps } from './Types';

const GoodsList: React.FC<IGoodsListProps> = ({
  collectionName,
  collectionId,
}) => {
  const { data: goods } = useCockpit<ICockpitGoodsEntries>(
    'collections',
    'Goods',
    'filter[collection._id]=' + collectionId
  );

  const filteredGoods = goods?.entries;

  return (
    <div className="goods-list">
      <h2 className="goods-list__collection-name">{collectionName}</h2>
      <div className="goods-list__goods-container">
        {filteredGoods?.map(({ _id, title, link, previewImage }) => (
          <GoodsItem
            key={_id}
            title={title}
            link={link}
            photo={previewImage.path}
          />
        ))}
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
