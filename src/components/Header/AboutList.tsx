import { AboutListData } from '../../constants/header';

const AboutList: React.FC = () => {
  return (
    <div className="about-list-data">
      {AboutListData.map((el) => (
        <p key={el}>{el}</p>
      ))}
    </div>
  );
};

export default AboutList;
