import { IGoodsListTitleProps } from './Types';

const GoodsListTitle: React.FC<IGoodsListTitleProps> = ({ title }) => {
  return (
    <div className="goods-list-title">{title ? <h2>{title}</h2> : <></>}</div>
  );
};

export default GoodsListTitle;
