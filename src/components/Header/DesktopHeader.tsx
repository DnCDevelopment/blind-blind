import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import SearchInput from './SearchInput';
import Sublist from './Sublist';

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
        (!menuRef.current.contains(e.target as Node) ||
          (e.target as HTMLTextAreaElement).tagName.toLowerCase() === 'a') &&
        desktopMenuOpen
      ) {
        setDesktopMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
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

  return (
    <header className="desktop-header">
      <div className="desktop-header__container container">
        <div ref={menuRef} className="desktop-header__options">
          <p
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => changeCurMenu('store')}
          >
            {TRANSLATE[locale as 'ru' | 'en'].store}
          </p>
          <p
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => changeCurMenu('about')}
          >
            {TRANSLATE[locale as 'ru' | 'en'].aboutUs}
          </p>
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
                data={collections}
                closeMenu={() => setDesktopMenuOpen(false)}
              />
            </div>
          </div>
        </div>
        <Logo />
        <div className="desktop-header__options">
          <LanguageSelector />
          <a className="desktop-header__options-option">
            {TRANSLATE[locale as 'ru' | 'en'].cart}
          </a>
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
          <SearchInput />
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
