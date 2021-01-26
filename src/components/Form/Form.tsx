import { IFormProps } from './Types';

const Form: React.FC<IFormProps> = ({ names, placeholders }) => {
  return (
    <form action="">
      {[...Array(names.length).keys()].map((idx) => (
        <input
          key={names[idx]}
          type="text"
          id={names[idx]}
          name={names[idx]}
          placeholder={placeholders[idx]}
        />
      ))}
    </form>
  );
};

export default Form;
