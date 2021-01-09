import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header: React.FC = () => {
  return (
    <div className="header">
      <MobileHeader />
      <DesktopHeader />
    </div>
  );
};

export default Header;
