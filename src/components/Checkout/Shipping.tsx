import { useRouter } from 'next/router';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormikValues } from 'formik';

import OrderSummaryList from './OrderSummaryList';
import ShippingMainForm from './ShippingMainForm';

import { cartContext } from '../../context/cartContext';
import { currencyContext } from '../../context/currencyContext';

import { ICartContext, ICurrencyContext } from '../../context/Types';

import { FORM } from '../../constants/form';

import { ICartGoodsItemProps } from '../Cart/Types';

const Shipping: React.FC = () => {
  const { locale, push } = useRouter();

  const { cart, clearCart } = useContext(cartContext) as ICartContext;

  const calcTotalCheckout = useCallback(
    () =>
      cart.reduce((counter, cartItem) => {
        return (
          counter + (cartItem.amount * Number.parseFloat(cartItem.price) || 0)
        );
      }, 0),
    [cart]
  );

  const [totalCheckout, setTotalCheckout] = useState(calcTotalCheckout());
  const [currencyTotalCheckout, setCurrencyTotalCheckout] = useState('0');
  const [deliveryType, setDeliveryType] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const couponRef = useRef<string>();
  const [formikValues, setFormikValues] = useState<FormikValues>();

  const { currency, currencyRate, USDRate } = useContext(
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

  const sendShippingEvent = useCallback(
    (event: 'InitiateCheckout' | 'Purchase') => {
      if (typeof window !== 'undefined') {
        fbq('track', event, {
          content_type: 'product',
          content_ids: cart.map((item) => {
            const cartItem = item as ICartGoodsItemProps;
            return cartItem?.link.replace('/', '') || 'cerificate';
          }),
          currency: currency.toString() === 'UAH' ? 'USD' : currency.toString(),
          value:
            currency.toString() === 'UAH'
              ? calcTotalCheckout() / USDRate
              : calcTotalCheckout() / currencyRate,
        });
      }
    },
    [cart, USDRate, calcTotalCheckout, currency, currencyRate]
  );

  const calcDeliveryCost = useCallback(
    (deliveryType: string) => {
      if (deliveryType === FORM[locale as 'ru' | 'en'].ukrPoshta) {
        if (deliveryCost === 0)
          setDeliveryCost(
            cart.reduce((cost, { amount }) => (cost += amount * 200), 400)
          );
      } else {
        setDeliveryCost(0);
      }
    },
    [cart, deliveryCost, locale, setDeliveryCost]
  );

  useEffect(() => {
    calcDeliveryCost(deliveryType);
  }, [
    deliveryType,
    cart,
    deliveryCost,
    locale,
    setDeliveryCost,
    calcDeliveryCost,
    totalCheckout,
  ]);

  const deliveryChangeHandler = (item: string) => {
    setDeliveryType(item);
  };

  useEffect(() => {
    sendShippingEvent('InitiateCheckout');
  }, [sendShippingEvent]);

  useEffect(() => {
    setTotalCheckout(calcTotalCheckout());
  }, [calcTotalCheckout]);

  useEffect(() => {
    setCurrencyTotalCheckout(
      ((totalCheckout + deliveryCost) / currencyRate).toFixed(2)
    );
  }, [totalCheckout, currencyRate, deliveryCost]);
  useEffect(() => {
    if (formikValues) confirmCheckout(formikValues);
  }, [formikValues]);

  const confirmCheckout = useCallback(
    (values: FormikValues) => {
      calcTotalCheckout();
      const {
        firstName,
        lastName,
        country,
        city,
        email,
        phone,
        paymentMethod,
        deliveryMethod,
        service,
        checkbox,
        warehouse,
        street,
        house,
        flat,
      } = values;
      if (checkbox)
        localStorage.setItem(
          'shipping',
          JSON.stringify({
            firstName,
            lastName,
            country,
            city,
            email,
            phone,
            paymentMethod,
            service,
            checkbox,
            warehouse,
            street,
            house,
            flat,
          })
        );
      else localStorage.removeItem('shipping');
      const transaction_id = 'purchase' + Math.random().toString(10).substr(2);
      gtag('event', 'purchase', {
        transaction_id,
        affiliation: 'Blind',
        value: currencyTotalCheckout,
        currency,
        tax: 0,
        shipping: deliveryCost,
        items: cart.map((item, index) => {
          return {
            id: item.id,
            name: item.title,
            list_name: 'Goods',
            brand: 'BLIND',
            category: item.collectionTitle,
            variant: item.details,
            list_position: index + 1,
            quantity: item.amount,
            price: item.price,
          };
        }),
      });
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
          deliveryMethod,
          deliveryCost,
          warehouse:
            deliveryMethod === FORM[locale as 'ru' | 'en'].novaPoshta
              ? warehouse
              : '',
          street:
            deliveryMethod === FORM[locale as 'ru' | 'en'].courierNovaPoshta
              ? street
              : '',
          house:
            deliveryMethod === FORM[locale as 'ru' | 'en'].courierNovaPoshta
              ? house
              : '',
          flat:
            deliveryMethod === FORM[locale as 'ru' | 'en'].courierNovaPoshta
              ? flat
              : '',
        }),
      })
        .then((data) => data.json())
        .then(({ signature, data }) => {
          if (
            typeof window !== 'undefined' &&
            paymentMethod === FORM[currentLocale as 'ru' | 'en'].paymentOnline
          ) {
            window.location.replace(
              `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`
            );
            clearCart();
          } else {
            push('/thank-you');
            clearCart();
          }
        });
    },
    [cart, calcTotalCheckout, currencyTotalCheckout]
  );
  const confirmCheckoutWrapper = useCallback((values: FormikValues) => {
    setFormikValues(values);
  }, []);

  const form = useMemo(
    () => (
      <ShippingMainForm
        deliveryChangeHandler={deliveryChangeHandler}
        confirmCheckout={confirmCheckoutWrapper}
      />
    ),
    [confirmCheckoutWrapper]
  );

  return (
    <div className="shipping container">
      <OrderSummaryList
        currencyTotalCheckout={currencyTotalCheckout}
        checkDiscountCode={checkDiscountCode}
      />
      {form}
    </div>
  );
};

export default Shipping;
