import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';

import { cartContext } from '../../context/cartContext';

import { TRANSLATE } from '../../constants/languages';
import { ICartContext } from '../../context/Types';

import CartSVG from '../../assets/svg/cart.svg';

const CartIcon: React.FC = () => {
  const { locale } = useRouter();

  const { cart } = useContext(cartContext) as ICartContext;

  const cartItemsCounter = cart.reduce(
    (counter, cartItem) => counter + (cartItem.amount || 0),
    0
  );

  return (
    <Link href="/cart">
      <a className="cart-icon">
        <p className="cart-icon__text-button">
          {TRANSLATE[locale as 'ru' | 'en'].cart}
          {!!cart.length && <span>({cartItemsCounter})</span>}
        </p>
        <p className="cart-icon__icon-button">
          {!!cart.length && <span>{cartItemsCounter}</span>}
          <CartSVG />
        </p>
      </a>
    </Link>
  );
};

export default CartIcon;
