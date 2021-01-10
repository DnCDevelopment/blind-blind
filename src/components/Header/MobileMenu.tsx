import { useContext, useState } from 'react';

import SearchInput from './SearchInput';
import Sublist from './Sublist';

import context from '../../context/context';
import collectionsContext from '../../context/collectionsContext';

import { ICollectionsContext, IContext } from '../../context/Types';
import { IMobileMenuProps } from './Types';

import { TRANSLATE } from '../../constants/languages';
import { AboutListData } from '../../constants/header';

import CrossSVG from '../../assets/svg/cross.svg';

const MobileMenu: React.FC<IMobileMenuProps> = ({ close }) => {
  const [storeListOpen, setStoreListOpen] = useState<boolean>(false);
  const [aboutListOpen, setAboutListOpen] = useState<boolean>(false);

  const { language } = useContext(context) as IContext;
  const { collectionsData } = useContext(
    collectionsContext
  ) as ICollectionsContext;

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
          {TRANSLATE[language as 'ru' | 'en'].store}
        </p>
        {storeListOpen && (
          <div className="mobile-menu__sublist mobile-menu__store-list-data-container">
            <Sublist data={collectionsData} />
          </div>
        )}
        <p role="presentation" onClick={() => setAboutListOpen(!aboutListOpen)}>
          {TRANSLATE[language as 'ru' | 'en'].aboutUs}
        </p>
        {aboutListOpen && (
          <div className="mobile-menu__sublist mobile-menu__about-list-data-container">
            <Sublist data={AboutListData[language as 'ru' | 'en']} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
