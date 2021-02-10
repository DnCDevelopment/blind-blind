import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import fetch from 'node-fetch';

import ShoppingCart from '../../assets/svg/shoppingCart.svg';

import { FORMIK } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';
import { cartContext } from '../../context/cartContext';
import { ICartContext } from '../../context/Types';
import Form from '../Form/Form';
import OrderSummaryListItem from './OrderSummaryListItem';

const Shipping: React.FC = () => {
  const { locale } = useRouter();

  const isServer = typeof window === 'undefined';

  const [orderSummaryListHeight, setOrderSummaryListHeight] = useState(false);

  const orderListRef = useRef<HTMLDivElement>(null);

  const { cart } = useContext(cartContext) as ICartContext;

  const checkDiscountCode = (enteredCode: string) => {
    fetch('api/getPromocode', {
      method: 'POST',
      body: enteredCode,
    })
      .then((res) => res.json())
      .then((json) => {
        const { discount } = json;
        if (discount) {
          console.log(discount.inPercent);
          setTotalCheckout(
            discount.inPercent
              ? calcTotalCheckout() *
                  (1 - Number.parseFloat(discount.discount) / 100)
              : calcTotalCheckout() - Number.parseFloat(discount.discount)
          );
        } else setTotalCheckout(calcTotalCheckout());
      });
  };

  const calcTotalCheckout = useCallback(
    () =>
      cart.reduce(
        (counter, cartItem) =>
          counter + (cartItem.amount * Number.parseFloat(cartItem.price) || 0),
        0
      ),
    [cart]
  );

  const [totalCheckout, setTotalCheckout] = useState(calcTotalCheckout());

  useEffect(() => {
    setTotalCheckout(calcTotalCheckout());
  }, [calcTotalCheckout]);

  return (
    <div className="shipping container">
      <div className="shipping__order-summary">
        <div
          className="order-summary-toggle container"
          role="presentation"
          onClick={() => {
            setOrderSummaryListHeight(!orderSummaryListHeight);
          }}
        >
          <ShoppingCart />
          {orderSummaryListHeight ? (
            <>
              <p>{TRANSLATE[locale as 'ru' | 'en'].hideOrderSummary}</p>
              <div className="chevron-up"></div>
            </>
          ) : (
            <>
              <p>{TRANSLATE[locale as 'ru' | 'en'].showOrderSummary}</p>
              <div className="chevron-down"></div>
            </>
          )}
          <div className="total-sum">{totalCheckout.toFixed(2)}₴</div>
        </div>
        <div
          ref={orderListRef}
          className={`order-summary-list container ${
            orderSummaryListHeight && 'open'
          }`}
        >
          {cart.map((props) => (
            <OrderSummaryListItem key={props.id} {...props} />
          ))}
          <div className="divider container" />
          <div className="discount">
            <Form
              formikConfig={{
                initialValues: FORMIK.shippingDiscount.values,
                onSubmit: (values) => {
                  checkDiscountCode(values.code);
                },
              }}
              types={{ code: 'text' }}
              placeholders={{ code: 'Discount code' }}
              buttonTitle="→"
            />
          </div>
          <div className="divider container" />
          <div className="total-checkout">
            <p className="title">Total</p>
            <p className="price">{totalCheckout.toFixed(2)}₴</p>
          </div>
          <div className="divider container" />
        </div>
      </div>
      <div className="shipping__info">
        <h2 className="title">{TRANSLATE[locale as 'ru' | 'en'].shipping}</h2>
        <div className="shipping__form">
          <Form
            formikConfig={{
              initialValues:
                !isServer && localStorage.getItem('shipping')
                  ? {
                      ...JSON.parse(localStorage.getItem('shipping') as string),
                    }
                  : FORMIK.shippingMain.values,
              validationSchema: FORMIK.shippingMain.validationSchema(
                locale as 'ru' | 'en'
              ),
              onSubmit: (values) => {
                if (values.checkbox)
                  localStorage.setItem('shipping', JSON.stringify(values));
                else localStorage.removeItem('shipping');
              },
            }}
            types={FORMIK.shippingMain.types}
            selectOptions={FORMIK.shippingMain.selectOptions(
              locale as 'ru' | 'en'
            )}
            placeholders={FORMIK.shippingMain.placeholders(
              locale as 'ru' | 'en'
            )}
            masks={{
              phone: '999 999 99 99',
            }}
            buttonTitle={TRANSLATE[locale as 'ru' | 'en'].continue}
            checkboxText={TRANSLATE[locale as 'ru' | 'en'].saveInfo}
          />
          <Link href="/cart">
            <div
              role="presentation"
              className="back-to-cart"
              onClick={() => {
                return;
              }}
            >
              <div className="arrow" />
              <p>{TRANSLATE[locale as 'ru' | 'en'].returnToCart}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
