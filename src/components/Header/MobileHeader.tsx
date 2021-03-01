import { useEffect, useState } from 'react';

import MobileMenu from './MobileMenu';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import CartIcon from '../Cart/CartIcon';

import DroplistIconSVG from '../../assets/svg/droplist-icon.svg';
import CurrencySelector from './CurrencySelector';

const MobileHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  useEffect(() => {
    document.body.className = mobileMenuOpen ? 'hide-overflow' : '';
  }, [mobileMenuOpen]);
  return (
    <header className="mobile-header">
      <div
        className={`mobile-header__mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
      >
        <MobileMenu close={() => setMobileMenuOpen(false)} />
      </div>
      <div className="mobile-header__container container">
        <div className="mobile-header__droplists">
          <div
            className="mobile-header__droplist-icon"
            role="presentation"
            onClick={() => setMobileMenuOpen(true)}
          >
            <DroplistIconSVG />
          </div>
          <CurrencySelector />
        </div>
        <Logo />
        <div className="mobile-header__lang-and-cart">
          <LanguageSelector />
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
