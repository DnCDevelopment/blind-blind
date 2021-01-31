import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TRANSLATE } from '../../constants/languages';
import { cartContext } from '../../context/cartContext';
import { ICartContext } from '../../context/Types';
import CartGoodsItem from './CartGoodsItem';

const MainCart: React.FC = () => {
  const { locale } = useRouter();

  const { cart, removeItem } = useContext(cartContext) as ICartContext;
  console.log(cart);

  return (
    <div className="main-cart">
      <p className="main-cart__title">
        {TRANSLATE[locale as 'ru' | 'en'].cartTitle}{' '}
        {cart.length == 0 && TRANSLATE[locale as 'ru' | 'en'].emptyCartTitle}
      </p>
      {cart.length == 0 ? (
        <p className="main-cart__continue-browsing">
          {TRANSLATE[locale as 'ru' | 'en'].continueBrowsing[0]}
          <Link href="/">
            {TRANSLATE[locale as 'ru' | 'en'].continueBrowsing[1]}
          </Link>
          .
        </p>
      ) : (
        <table>
          <thead>
            <td className="image-col"></td>
            <td className="about-col"></td>
            <td>{TRANSLATE[locale as 'ru' | 'en'].price}</td>
            <td>{TRANSLATE[locale as 'ru' | 'en'].total}</td>
          </thead>
          <tbody>
            {cart.map((item) => (
              <CartGoodsItem
                key={item.title}
                {...item}
                removeSelf={() => removeItem(item)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainCart;
