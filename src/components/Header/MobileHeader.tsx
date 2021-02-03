import { useState } from 'react';

import MobileMenu from './MobileMenu';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

import DroplistIconSVG from '../../assets/svg/droplist-icon.svg';
import CartIcon from '../Cart/CartIcon';

const MobileHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="mobile-header">
      <div
        className={`mobile-header__mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
      >
        <MobileMenu close={() => setMobileMenuOpen(false)} />
      </div>
      <div className="mobile-header__container container">
        <div
          className="mobile-header__droplist-icon"
          role="presentation"
          onClick={() => setMobileMenuOpen(true)}
        >
          <DroplistIconSVG />
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
