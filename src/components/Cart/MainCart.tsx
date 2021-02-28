import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { TRANSLATE } from '../../constants/languages';
import { cartContext } from '../../context/cartContext';
import { currencyContext } from '../../context/currencyContext';
import { ICartContext, ICurrencyContext } from '../../context/Types';
import Form from '../Form/Form';
import CartGoodsItem from './CartGoodsItem';
import CartVoucherItem from './CartVoucherItem';

const MainCart: React.FC = () => {
  const { locale, push } = useRouter();

  const { cart, removeItem } = useContext(cartContext) as ICartContext;
  const { currency, currencyRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  const subTotal = cart.reduce(
    (counter, cartItem) =>
      counter + (cartItem.amount * Number.parseFloat(cartItem.price) || 0),
    0
  );

  const currencySubTotal = (subTotal / currencyRate).toFixed(2);

  return (
    <div className="main-cart">
      <p className="main-cart__title">
        {TRANSLATE[locale as 'ru' | 'en'].cartTitle}{' '}
        {!cart.length && TRANSLATE[locale as 'ru' | 'en'].emptyCartTitle}
      </p>
      {!cart.length ? (
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
            {cart.map((item, idx) =>
              'details' in item ? (
                <CartGoodsItem
                  key={idx}
                  {...item}
                  removeSelf={() => removeItem(item)}
                />
              ) : (
                <CartVoucherItem
                  key={idx}
                  {...item}
                  removeSelf={() => removeItem(item)}
                />
              )
            )}
            <tr className="sub-total-row">
              <td></td>
              <td></td>
              <td className="sub-total" colSpan={2}>
                <p>
                  {TRANSLATE[locale as 'ru' | 'en'].subTotal}
                  <span className="sum">
                    {currencySubTotal} {currency}
                  </span>
                </p>
                <Form
                  formikConfig={{
                    initialValues: {},
                    onSubmit: () => push('/checkout'),
                  }}
                  types={{}}
                  placeholders={{}}
                  buttonTitle={TRANSLATE[locale as 'ru' | 'en'].checkOut}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainCart;
