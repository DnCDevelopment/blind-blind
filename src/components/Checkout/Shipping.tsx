import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FormikValues } from 'formik';

import Form from '../Form/Form';
import OrderSummaryListItem from './OrderSummaryListItem';

import { cartContext } from '../../context/cartContext';
import { currencyContext } from '../../context/currencyContext';

import { ICartContext, ICurrencyContext } from '../../context/Types';

import { FORM, FORMIK } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';

import ShoppingCart from '../../assets/svg/shoppingCart.svg';

const Shipping: React.FC = () => {
  const { locale, push } = useRouter();

  const isServer = typeof window === 'undefined';

  const [orderSummaryListHeight, setOrderSummaryListHeight] = useState(false);

  const orderListRef = useRef<HTMLDivElement>(null);
  const couponRef = useRef<string>();

  const { cart, clearCart } = useContext(cartContext) as ICartContext;
  const { currency, currencyRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  const checkDiscountCode = (enteredCode: string) => {
    fetch('/api/getPromocode', {
      method: 'POST',
      body: enteredCode,
    })
      .then((res) => res.json())
      .then((json) => {
        const { discount } = json;

        couponRef.current = enteredCode;
        if (discount) {
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

  const confirmCheckout = (values: FormikValues) => {
    const {
      firstName,
      lastName,
      country,
      city,
      email,
      phone,
      paymentMethod,
      service,
      checkbox,
    } = values;
    if (checkbox) localStorage.setItem('shipping', JSON.stringify(values));
    else localStorage.removeItem('shipping');
    const currentLocale = locale;
    const url = '/api/checkout';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: firstName,
        surname: lastName,
        deliveryService: service,
        paymentType: paymentMethod,
        totalSum: +currencyTotalCheckout,
        coupon: couponRef.current,
        locale: currentLocale,
        email,
        country,
        city,
        phone,
        items: cart,
        currency,
      }),
    })
      .then((data) => data.json())
      .then(({ signature, data }) => {
        if (
          typeof window !== 'undefined' &&
          paymentMethod === FORM[currentLocale as 'ru' | 'en'].paymentOnline
        )
          window.open(
            `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`,
            '__blank'
          );
        clearCart();
        push('/thank-you');
      });
  };

  const [totalCheckout, setTotalCheckout] = useState(calcTotalCheckout());
  const [currencyTotalCheckout, setCurrencyTotalCheckout] = useState('0');

  useEffect(() => {
    setTotalCheckout(calcTotalCheckout());
  }, [calcTotalCheckout]);

  useEffect(() => {
    setCurrencyTotalCheckout((totalCheckout / currencyRate).toFixed(2));
  }, [totalCheckout, currencyRate]);

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
          <div className="total-sum">
            {currencyTotalCheckout} {currency}
          </div>
        </div>
        <div
          ref={orderListRef}
          className={`order-summary-list container ${
            orderSummaryListHeight && 'open'
          }`}
        >
          {cart.map((props, idx) =>
            'title' in props ? (
              <OrderSummaryListItem
                key={idx}
                price={props.price}
                amount={props.amount}
                title={props.title}
                photo={props.photo}
                details={props.details}
              />
            ) : (
              <OrderSummaryListItem
                key={idx}
                price={props.price}
                amount={props.amount}
                receiverName={props.receiverName}
              />
            )
          )}
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
              placeholders={{
                code: TRANSLATE[locale as 'ru' | 'en'].discountCode,
              }}
              buttonTitle="→"
            />
          </div>
          <div className="divider container" />
          <div className="total-checkout">
            <p className="title">{TRANSLATE[locale as 'ru' | 'en'].subTotal}</p>
            <p className="price">
              {currencyTotalCheckout} {currency}
            </p>
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
              onSubmit: confirmCheckout,
            }}
            types={FORMIK.shippingMain.types}
            selectOptions={FORMIK.shippingMain.selectOptions(
              locale as 'ru' | 'en'
            )}
            placeholders={FORMIK.shippingMain.placeholders(
              locale as 'ru' | 'en'
            )}
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
