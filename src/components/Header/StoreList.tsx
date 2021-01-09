import { StoreListData } from '../../constants/header';

const StoreList: React.FC = () => {
  return (
    <div className="about-list-data">
      {StoreListData.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </div>
  );
};

export default StoreList;
