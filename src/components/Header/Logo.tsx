import { useContext } from 'react';
import Link from 'next/link';

import LogoSvg from '../../assets/svg/logo.svg';

import { ICartContext } from '../../context/Types';

import { cartContext } from '../../context/cartContext';

const Logo: React.FC = () => {
  const { cart } = useContext(cartContext) as ICartContext;
  return (
    <Link href="/">
      <a className={cart.length ? 'not-empty' : 'empty'} style={{}}>
        <LogoSvg width={130} />
      </a>
    </Link>
  );
};

export default Logo;
