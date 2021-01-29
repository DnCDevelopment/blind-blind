import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { IButtonProps } from './Types';

const Button: React.FC<
  IButtonProps &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({ title, callback, ...buttonProps }) => {
  return (
    <button className="button" onClick={callback} {...buttonProps}>
      <p className="button__title">{title}</p>
    </button>
  );
};

export default Button;
