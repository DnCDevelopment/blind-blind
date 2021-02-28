import { useRouter } from 'next/router';
import { useContext } from 'react';

import Form from '../Form/Form';

import { cartContext } from '../../context/cartContext';

import { ICartVoucherItemProps } from '../Cart/Types';
import { ICartContext } from '../../context/Types';

import { FORMIK } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';

const Voucher: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  const curCartContext = useContext(cartContext) as ICartContext;

  const addToCart = ({
    receiverName,
    receiverEmail,
    yourName,
    yourEmail,
    message,
    price,
    theme,
  }: ICartVoucherItemProps) => {
    const id = 'voucher' + Math.random().toString(10).substr(2);

    if (!curCartContext.cart.filter((item) => item.id === id).length)
      curCartContext.addItem({
        id,
        receiverName,
        receiverEmail,
        yourName,
        yourEmail,
        message,
        price,
        amount: 1,
        theme,
      });
    else
      addToCart({
        id,
        receiverName,
        receiverEmail,
        yourName,
        yourEmail,
        message,
        price,
        amount: 1,
        theme,
      });
    router.push('/cart');
  };

  return (
    <div className="voucher container">
      <h2 className="voucher__title">
        {TRANSLATE[locale as 'ru' | 'en'].giftCertificateTitle}
      </h2>
      <p className="voucher__description">
        {TRANSLATE[locale as 'ru' | 'en'].giftCertificateDescription}
      </p>
      <div className="voucher__form-container">
        <Form
          formikConfig={{
            initialValues: FORMIK.voucher.values,
            validationSchema: FORMIK.voucher.validationSchema(
              locale as 'ru' | 'en'
            ),
            onSubmit: (values) => {
              addToCart(values as ICartVoucherItemProps);
            },
          }}
          types={FORMIK.voucher.types}
          placeholders={FORMIK.voucher.placeholders(locale as 'ru' | 'en')}
          selectOptions={FORMIK.voucher.selectOptions(locale as 'ru' | 'en')}
          suffixes={FORMIK.voucher.suffixes}
          buttonTitle={TRANSLATE[locale as 'ru' | 'en'].addToCart}
        />
      </div>
    </div>
  );
};

export default Voucher;
