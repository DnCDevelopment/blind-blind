import Link from 'next/link';

import LogoSvg from '../../assets/svg/logo.svg';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a>
        <LogoSvg width={130} />
      </a>
    </Link>
  );
};

export default Logo;
