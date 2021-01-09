import { useEffect, useRef, useState } from 'react';

import AboutList from './AboutList';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import SearchInput from './SearchInput';
import StoreList from './StoreList';

const DesktopHeader: React.FC = () => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<boolean>(false);
  const [curMenu, setCurMenu] = useState<number>(1);
  const [searchContainerOpen, setSearchContainerOpen] = useState<boolean>(
    false
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const changeCurMenu = (id: number) => {
    if (!desktopMenuOpen) setDesktopMenuOpen(true);
    else if (curMenu === id) setDesktopMenuOpen(false);
    setCurMenu(id);
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
          <a role="presentation" onClick={() => changeCurMenu(1)}>
            Магазин
          </a>
          <a role="presentation" onClick={() => changeCurMenu(2)}>
            Про нас
          </a>
          <div
            className={`desktop-header__desktop-menu ${
              desktopMenuOpen ? 'open' : ''
            }`}
          >
            {curMenu === 1 ? <AboutList /> : <StoreList />}
          </div>
        </div>
        <Logo />
        <LanguageSelector />
        <div className="desktop-header__options">
          <a>Корзина</a>
          <a
            role="presentation"
            onClick={() => setSearchContainerOpen(!searchContainerOpen)}
          >
            Пошук
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
