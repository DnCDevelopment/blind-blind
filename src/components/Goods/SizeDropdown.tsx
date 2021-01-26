import { useState } from 'react';
import { ISizeDropdownProps } from './Types';

const SizeDropdown: React.FC<ISizeDropdownProps> = ({
  curSize,
  sizes,
  changeCurSize,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="size-dropdown">
      <div
        className="size-dropdown__cur-size-label"
        role="presentation"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <p className="size">{curSize}</p>
        <div className="dropdown-button" />
      </div>
      <div
        className={`size-dropdown__sizes-list ${dropdownOpen ? 'open' : ''}`}
      >
        {sizes.map((size) => (
          <p
            key={size}
            role="presentation"
            onClick={() => {
              changeCurSize(size);
              setDropdownOpen(false);
            }}
          >
            {size}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SizeDropdown;
