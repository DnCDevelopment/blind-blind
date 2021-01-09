import SearchInput from './SearchInput';

import CrossSVG from '../../assets/svg/cross.svg';
import { IMobileMenuProps } from './Types';
import AboutList from './AboutList';
import StoreList from './StoreList';
import { useState } from 'react';

const MobileMenu: React.FC<IMobileMenuProps> = ({ close }) => {
  const [storeListOpen, setStoreListOpen] = useState<boolean>(false);
  const [aboutListOpen, setAboutListOpen] = useState<boolean>(false);

  return (
    <div className="mobile-menu">
      <div className="container">
        <div
          className="mobile-menu__cross-icon"
          role="presentation"
          onClick={close}
        >
          <CrossSVG />
        </div>
        <SearchInput />
        <p role="presentation" onClick={() => setStoreListOpen(!storeListOpen)}>
          Магазин
        </p>
        {storeListOpen && (
          <div className="mobile-menu__sublist mobile-menu__store-list-data-container">
            <StoreList />
          </div>
        )}
        <p role="presentation" onClick={() => setAboutListOpen(!aboutListOpen)}>
          Про нас
        </p>
        {aboutListOpen && (
          <div className="mobile-menu__sublist mobile-menu__about-list-data-container">
            <AboutList />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
