import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import SearchInput from './SearchInput';
import Sublist from './Sublist';
import CartIcon from '../Cart/CartIcon';
import CurrencySelector from './CurrencySelector';

import { indexContext } from '../../context/cockpitContext';

import { IIndexContext } from '../../context/Types';

import { TRANSLATE } from '../../constants/languages';
import { AboutListData, StoreListData } from '../../constants/header';

const DesktopHeader: React.FC = () => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<boolean>(false);
  const [curMenu, setCurMenu] = useState<'store' | 'about'>('store');
  const [searchContainerOpen, setSearchContainerOpen] = useState<boolean>(
    false
  );

  const router = useRouter();
  const { locale } = router;

  const { collectionsData } = useContext(indexContext) as IIndexContext;
  const constantCollections = StoreListData[locale as 'ru' | 'en'];
  const collections = collectionsData.concat(constantCollections);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const changeCurMenu = (menu: 'store' | 'about') => {
    if (!desktopMenuOpen) setDesktopMenuOpen(true);
    else if (curMenu === menu) setDesktopMenuOpen(false);
    setCurMenu(menu);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        desktopMenuOpen
      ) {
        setDesktopMenuOpen(false);
      }
      if (
        searchRef.current &&
        (!searchRef.current.contains(e.target as Node) ||
          (e.target as HTMLDivElement).tagName.toLowerCase() === 'a') &&
        searchContainerOpen
      ) {
        setSearchContainerOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [desktopMenuOpen, searchContainerOpen]);

  useEffect(() => {
    document.body.className =
      desktopMenuOpen || searchContainerOpen ? 'hide-overflow' : '';
  }, [desktopMenuOpen, searchContainerOpen]);

  return (
    <header className="desktop-header">
      <div className="desktop-header__container container">
        <div ref={menuRef} className="desktop-header__options">
          <a
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => changeCurMenu('store')}
          >
            {TRANSLATE[locale as 'ru' | 'en'].store}
          </a>
          <a
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => changeCurMenu('about')}
          >
            {TRANSLATE[locale as 'ru' | 'en'].aboutUs}
          </a>
          <CurrencySelector />
          <div
            className={`desktop-header__desktop-menu ${
              desktopMenuOpen ? 'open' : ''
            }`}
          >
            <div
              className={`options-sublist ${curMenu === 'about' ? 'open' : ''}`}
            >
              <Sublist
                data={AboutListData[locale as 'ru' | 'en']}
                closeMenu={() => setDesktopMenuOpen(false)}
              />
            </div>
            <div
              className={`options-sublist ${curMenu === 'store' ? 'open' : ''}`}
            >
              <Sublist
                data={collections.reverse()}
                closeMenu={() => setDesktopMenuOpen(false)}
              />
            </div>
          </div>
        </div>
        <Logo />
        <div className="desktop-header__options">
          <LanguageSelector />
          <CartIcon />
          <a
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => setSearchContainerOpen(!searchContainerOpen)}
          >
            {TRANSLATE[locale as 'ru' | 'en'].search}
          </a>
        </div>
        <div
          ref={searchRef}
          className={`desktop-header__search-container ${
            searchContainerOpen ? 'open' : ''
          }`}
        >
          <SearchInput close={() => setSearchContainerOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
