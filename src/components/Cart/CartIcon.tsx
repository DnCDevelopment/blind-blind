import { useRouter } from 'next/router';
import { useContext } from 'react';

import { cartContext } from '../../context/cartContext';

import { TRANSLATE } from '../../constants/languages';
import { ICartContext } from '../../context/Types';

import CartSVG from '../../assets/svg/cart.svg';

const CartIcon: React.FC = () => {
  const { locale } = useRouter();

  const { cart } = useContext(cartContext) as ICartContext;

  return (
    <a className="cart-icon">
      <p className="cart-icon__text-button">
        {TRANSLATE[locale as 'ru' | 'en'].cart}
        {cart.length > 0 && <span>({cart.length})</span>}
      </p>
      <p className="cart-icon__icon-button">
        {cart.length > 0 && <span>{cart.length}</span>}
        <CartSVG />
      </p>
    </a>
  );
};

export default CartIcon;
