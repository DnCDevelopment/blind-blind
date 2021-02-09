import { useState } from 'react';
import { IDropdownProps } from './Types';

const Dropdown: React.FC<IDropdownProps> = ({
  value,
  placeholder,
  values,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <div
        className="dropdown__value"
        role="presentation"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? (
          <p className="value-label">{value}</p>
        ) : (
          <p className="placeholder">{placeholder}</p>
        )}
        <div className="dropdown-button" />
      </div>
      <div className={`dropdown__list ${isOpen ? 'open' : ''}`}>
        {values.map((listItem) => (
          <p
            key={listItem}
            role="presentation"
            onClick={() => {
              setValue(listItem);
              setIsOpen(false);
            }}
          >
            {listItem}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
