import { useState } from 'react';

import SearchInput from './SearchInput';
import Sublist from './Sublist';

import CrossSVG from '../../assets/svg/cross.svg';

import { IMobileMenuProps } from './Types';

import { AboutListData, StoreListData } from '../../constants/header';

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
            <Sublist data={StoreListData} />
          </div>
        )}
        <p role="presentation" onClick={() => setAboutListOpen(!aboutListOpen)}>
          Про нас
        </p>
        {aboutListOpen && (
          <div className="mobile-menu__sublist mobile-menu__about-list-data-container">
            <Sublist data={AboutListData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
