import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import SearchInput from './SearchInput';
import Sublist from './Sublist';

import { indexContext } from '../../context/cockpitContext';

import { IIndexContext } from '../../context/Types';
import { IMobileMenuProps } from './Types';

import { TRANSLATE } from '../../constants/languages';
import { AboutListData, StoreListData } from '../../constants/header';

import CrossSVG from '../../assets/svg/cross.svg';

const MobileMenu: React.FC<IMobileMenuProps> = ({ close }) => {
  const [storeListOpen, setStoreListOpen] = useState<boolean>(false);
  const [aboutListOpen, setAboutListOpen] = useState<boolean>(false);

  const { locale } = useRouter();

  const { collectionsData, runwaysData, hasStocks } = useContext(
    indexContext
  ) as IIndexContext;

  const constantCollections = StoreListData[locale as 'ru' | 'en'];
  const collections = collectionsData.concat(constantCollections);
  const aboutSublist = AboutListData[locale as 'en' | 'ru'];

  aboutSublist[3].subsublist = runwaysData;

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
          {TRANSLATE[locale as 'ru' | 'en'].store}
        </p>
        {storeListOpen && (
          <div className="mobile-menu__sublist mobile-menu__store-list-data-container">
            <Sublist
              data={
                hasStocks
                  ? collections
                  : collections.filter(({ link }) => link !== '/sales')
              }
              closeMenu={close}
            />
          </div>
        )}
        <p role="presentation" onClick={() => setAboutListOpen(!aboutListOpen)}>
          {TRANSLATE[locale as 'ru' | 'en'].aboutUs}
        </p>
        {aboutListOpen && (
          <div className="mobile-menu__sublist mobile-menu__about-list-data-container">
            <Sublist data={aboutSublist} closeMenu={close} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
