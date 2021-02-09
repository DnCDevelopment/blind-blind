import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import ShoppingCart from '../../assets/svg/shoppingCart.svg';

import { FORM } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';
import { cartContext } from '../../context/cartContext';
import { ICartContext } from '../../context/Types';
import Form from '../Form/Form';
import OrderSummaryListItem from './OrderSummaryListItem';
import { IShippingProps } from './Types';

const Shipping: React.FC<IShippingProps> = ({ promocodes }) => {
  const { locale } = useRouter();

  const isServer = typeof window === 'undefined';

  const [orderSummaryListHeight, setOrderSummaryListHeight] = useState('0');

  const orderListRef = useRef<HTMLDivElement>(null);

  const { cart } = useContext(cartContext) as ICartContext;

  const toggleOrderList = (mode: boolean) => {
    setOrderSummaryListHeight(
      mode ? `${orderListRef.current?.scrollHeight}px` : '0'
    );
  };

  const checkDiscountCode = (enteredCode: string) => {
    const activeCodes = promocodes.filter((item) => item.code === enteredCode);
    if (activeCodes.length) {
      const activeCode = activeCodes[0];
      setTotalCheckout(
        activeCode.inPercent
          ? calcTotalCheckout() *
              (1 - Number.parseFloat(activeCode.discount) / 100)
          : calcTotalCheckout() - Number.parseFloat(activeCode.discount)
      );
      console.log(activeCodes.length);
    } else {
      setTotalCheckout(calcTotalCheckout());
    }
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
    const handleResize = () => {
      setOrderSummaryListHeight(window.innerWidth < 1024 ? '0' : '100%');
    };

    setOrderSummaryListHeight(window.innerWidth < 1024 ? '0' : '100%');

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            toggleOrderList(orderSummaryListHeight === '0');
          }}
        >
          <ShoppingCart />
          {orderSummaryListHeight === '0' ? (
            <>
              <p>{TRANSLATE[locale as 'ru' | 'en'].showOrderSummary}</p>
              <div className="chevron-down"></div>
            </>
          ) : (
            <>
              <p>{TRANSLATE[locale as 'ru' | 'en'].hideOrderSummary}</p>
              <div className="chevron-up"></div>
            </>
          )}
          <div className="total-sum">{totalCheckout.toFixed(2)}₴</div>
        </div>
        <div
          ref={orderListRef}
          style={{
            height: orderSummaryListHeight,
          }}
          className="order-summary-list container"
        >
          {cart.map((props) => (
            <OrderSummaryListItem key={props.id} {...props} />
          ))}
          <div className="divider container" />
          <div className="discount">
            <Form
              formikConfig={{
                initialValues: { code: '' },
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
                  : {
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      service: '',
                      paymentMethod: '',
                      checkbox: false,
                    },
              validationSchema: Yup.object({
                firstName: Yup.string()
                  .matches(
                    /^[a-zA-Zа-яА-Я]+$/,
                    FORM[locale as 'ru' | 'en'].lettersRequired
                  )
                  .required(FORM[locale as 'ru' | 'en'].required),
                lastName: Yup.string()
                  .matches(
                    /^[a-zA-Zа-яА-Я]+$/,
                    FORM[locale as 'ru' | 'en'].lettersRequired
                  )
                  .required(FORM[locale as 'ru' | 'en'].required),
                email: Yup.string().email(),
                phone: Yup.number()
                  .required(FORM[locale as 'ru' | 'en'].required)
                  .typeError(FORM[locale as 'ru' | 'en'].wrongInput),
                service: Yup.string().required(
                  FORM[locale as 'ru' | 'en'].required
                ),
                paymentMethod: Yup.string().required(
                  FORM[locale as 'ru' | 'en'].required
                ),
              }),
              onSubmit: (values) => {
                if (values.checkbox)
                  localStorage.setItem('shipping', JSON.stringify(values));
                else localStorage.removeItem('shipping');
              },
            }}
            types={{
              firstName: 'text',
              lastName: 'text',
              email: 'text',
              phone: 'text',
              checkbox: 'checkbox',
              service: 'select',
              paymentMethod: 'select',
            }}
            selectOptions={{
              service: FORM[locale as 'ru' | 'en'].deliveryServices,
              paymentMethod: FORM[locale as 'ru' | 'en'].paymentMethods,
            }}
            placeholders={{
              firstName: FORM[locale as 'ru' | 'en'].firstName,
              lastName: FORM[locale as 'ru' | 'en'].lastName,
              email: FORM[locale as 'ru' | 'en'].email,
              phone: FORM[locale as 'ru' | 'en'].phone,
              service: FORM[locale as 'ru' | 'en'].deliveryService,
              paymentMethod: FORM[locale as 'ru' | 'en'].paymentMethod,
            }}
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
