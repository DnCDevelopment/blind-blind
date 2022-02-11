import React, { useState, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { currencyContext } from '../../context/currencyContext';

import { IOrderSummaryListProps } from './Types';
import { FORMIK } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';
import Form from '../Form/Form';

import ShoppingCart from '../../assets/svg/shoppingCart.svg';

import { ICartContext, ICurrencyContext } from '../../context/Types';
import { cartContext } from '../../context/cartContext';
import OrderSummaryListItem from './OrderSummaryListItem';

const OrderSummaryList: React.FC<IOrderSummaryListProps> = ({
  currencyTotalCheckout,
  checkDiscountCode,
}) => {
  const { currency } = useContext(currencyContext) as ICurrencyContext;

  const { locale } = useRouter();
  const { cart } = useContext(cartContext) as ICartContext;

  const [orderSummaryListHeight, setOrderSummaryListHeight] = useState(false);
  const orderListRef = useRef<HTMLDivElement>(null);

  return (
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
  );
};

export default OrderSummaryList;
