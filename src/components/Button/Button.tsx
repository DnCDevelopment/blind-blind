import { IButtonProps } from './Types';

const Button: React.FC<IButtonProps> = ({ title, callback }) => {
  return (
    <div role="presentation" className="button" onClick={callback}>
      <p className="title">{title}</p>
    </div>
  );
};

export default Button;
