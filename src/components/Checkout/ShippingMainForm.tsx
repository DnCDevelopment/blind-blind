import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { IShippingMainFormProps } from './Types';
import { FORM, FORMIK } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';
import Form from '../Form/Form';

const ShippingMainForm: React.FC<IShippingMainFormProps> = ({
  confirmCheckout,
  deliveryChangeHandler,
}) => {
  const { locale } = useRouter();

  const isServer = typeof window === 'undefined';

  return (
    <div className="shipping__info">
      <h2 className="title">{TRANSLATE[locale as 'ru' | 'en'].shipping}</h2>
      <div className="shipping__form">
        <Form
          formikConfig={{
            initialValues:
              !isServer && localStorage.getItem('shipping')
                ? {
                    ...FORMIK.shippingMain.values,
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
          placeholders={FORMIK.shippingMain.placeholders(locale as 'ru' | 'en')}
          buttonTitle={TRANSLATE[locale as 'ru' | 'en'].continue}
          checkboxText={TRANSLATE[locale as 'ru' | 'en'].saveInfo}
          optionFields={[
            {
              dependFieldName: 'deliveryMethod',
              dependFieldValue: FORM[locale as 'ru' | 'en'].novaPoshta,
              fieldName: 'warehouse',
            },
            {
              dependFieldName: 'deliveryMethod',
              dependFieldValue: FORM[locale as 'ru' | 'en'].courierNovaPoshta,
              fieldName: 'street',
            },
            {
              dependFieldName: 'deliveryMethod',
              dependFieldValue: FORM[locale as 'ru' | 'en'].courierNovaPoshta,
              fieldName: 'house',
            },
            {
              dependFieldName: 'deliveryMethod',
              dependFieldValue: FORM[locale as 'ru' | 'en'].courierNovaPoshta,
              fieldName: 'flat',
            },
          ]}
          deliveryChangeHandler={deliveryChangeHandler}
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
      <p className="shipping__policy">
        {TRANSLATE[locale as 'ru' | 'en'].orderPoliics}{' '}
        <Link href="/politika-bezopasnosti">
          {TRANSLATE[locale as 'ru' | 'en'].privacyPolicyCart}
        </Link>{' '}
      </p>
    </div>
  );
};

export default ShippingMainForm;
