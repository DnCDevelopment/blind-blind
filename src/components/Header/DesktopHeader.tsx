import { useContext, useEffect, useRef, useState } from 'react';

import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import SearchInput from './SearchInput';
import Sublist from './Sublist';

import context from '../../context/context';
import { indexContext } from '../../context/cockpitContext';

import { IIndexContext, IContext } from '../../context/Types';

import { TRANSLATE } from '../../constants/languages';
import { AboutListData } from '../../constants/header';

const DesktopHeader: React.FC = () => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<boolean>(false);
  const [curMenu, setCurMenu] = useState<'store' | 'about'>('store');
  const [searchContainerOpen, setSearchContainerOpen] = useState<boolean>(
    false
  );

  const { language } = useContext(context) as IContext;
  const { collectionsData } = useContext(indexContext) as IIndexContext;

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
          <a
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => changeCurMenu('store')}
          >
            {TRANSLATE[language as 'ru' | 'en'].store}
          </a>
          <a
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => changeCurMenu('about')}
          >
            {TRANSLATE[language as 'ru' | 'en'].aboutUs}
          </a>
          <div
            className={`desktop-header__desktop-menu ${
              desktopMenuOpen ? 'open' : ''
            }`}
          >
            <div
              className={`options-sublist ${curMenu === 'about' ? 'open' : ''}`}
            >
              <Sublist data={AboutListData[language as 'ru' | 'en']} />
            </div>
            <div
              className={`options-sublist ${curMenu === 'store' ? 'open' : ''}`}
            >
              <Sublist data={collectionsData} />
            </div>
          </div>
        </div>
        <Logo />
        <div className="desktop-header__options">
          <LanguageSelector />
          <a className="desktop-header__options-option">
            {TRANSLATE[language as 'ru' | 'en'].cart}
          </a>
          <a
            className="desktop-header__options-option"
            role="presentation"
            onClick={() => setSearchContainerOpen(!searchContainerOpen)}
          >
            {TRANSLATE[language as 'ru' | 'en'].search}
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
