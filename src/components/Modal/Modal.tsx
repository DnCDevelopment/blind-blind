import { IModalProps } from './Types';

const Modal: React.FC<IModalProps> = ({ children, close }) => {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div role="presentation" onClick={close} className="modal__container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
