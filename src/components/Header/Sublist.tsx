import { ISublistProps } from './Types';

const Sublist: React.FC<ISublistProps> = ({ data }) => {
  return (
    <div className="about-list-data">
      {data.map((el: string) => (
        <p key={el}>{el}</p>
      ))}
    </div>
  );
};

export default Sublist;
