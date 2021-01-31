import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';
import { TRANSLATE } from '../../constants/languages';
import { cartContext } from '../../context/cartContext';
import { ICartContext } from '../../context/Types';
import Button from '../Button/Button';
import CartGoodsItem from './CartGoodsItem';

const MainCart: React.FC = () => {
  const agreementRef = useRef<HTMLInputElement>(null);

  const { locale } = useRouter();

  const { cart, removeItem } = useContext(cartContext) as ICartContext;

  const subTotal = cart.reduce(
    (a, b) => a + (b.amount * Number.parseFloat(b.price) || 0),
    0
  );

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
            <tr>
              <th className="image-col"></th>
              <th className="about-col"></th>
              <th>{TRANSLATE[locale as 'ru' | 'en'].price}</th>
              <th>{TRANSLATE[locale as 'ru' | 'en'].total}</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <CartGoodsItem
                key={idx}
                {...item}
                removeSelf={() => removeItem(item)}
              />
            ))}
            <tr className="sub-total-row">
              <td></td>
              <td></td>
              <td className="sub-total" colSpan={2}>
                <p>
                  {TRANSLATE[locale as 'ru' | 'en'].subTotal}
                  <span className="sum">{subTotal} UAH</span>
                </p>
                <form className="agreement-form">
                  <div className="agreement">
                    <input
                      className="checkbox"
                      name="agree"
                      id="agree"
                      type="checkbox"
                      ref={agreementRef}
                    />
                    <label htmlFor="agree">
                      {TRANSLATE[locale as 'ru' | 'en'].agreement}
                    </label>
                  </div>
                  <Button
                    type="button"
                    title={TRANSLATE[locale as 'ru' | 'en'].checkOut}
                    onClick={() => console.log(agreementRef.current?.checked)}
                  />
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainCart;
