import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FormikValues } from 'formik';

import Form from '../Form/Form';
import PriceLabel from './PriceLabel';
import ZoomImage from './ZoomImage';

import { cartContext } from '../../context/cartContext';

import { IGoodsSingleProps } from './Types';
import { ICartContext, ICurrencyContext } from '../../context/Types';

import { TRANSLATE } from '../../constants/languages';
import { FORMIK } from '../../constants/form';
import { currencyContext } from '../../context/currencyContext';

const GoodsSingle: React.FC<IGoodsSingleProps> = ({
  id,
  title,
  link,
  price,
  stockPrice,
  photo,
  secondPhoto,
  otherPhotos,
  sizes,
  description,
  materials,
  isExclusive,
  collectionLink,
}) => {
  const router = useRouter();
  const { locale } = router;

  const isServer = typeof window === 'undefined';

  const curCartContext = useContext(cartContext) as ICartContext;
  const { currency, currencyRate, USDRate } = useContext(
    currencyContext
  ) as ICurrencyContext;

  const addToCart = (details: string | FormikValues) => {
    curCartContext.addItem({
      id,
      title,
      link: link as string,
      price: stockPrice ? stockPrice : price,
      photo,
      details: details,
      amount: 1,
    });

    if (typeof window !== 'undefined') {
      const code = link?.replace('/', '') as string;

      fbq('track', 'AddToCart', {
        content_type: 'product',
        content_ids: code,
        currency: 'USD',
        value:
          currency.toString() === 'UAH'
            ? +(stockPrice ? stockPrice : price) / USDRate
            : +(stockPrice ? stockPrice : price) / currencyRate,
      });
    }

    router.push('/cart');
  };

  return (
    <div className="goods-single">
      <div className="goods-single__gallery">
        <div className="first-photo">
          <ZoomImage image={photo} alt={title} zoom={2} />
        </div>
        {secondPhoto && (
          <div className="second-photo">
            <ZoomImage image={secondPhoto} alt={title} zoom={2} />
          </div>
        )}
        {typeof otherPhotos !== 'string' &&
          otherPhotos.map(({ path }) => (
            <div key={path} className="other-photo">
              <ZoomImage image={path} alt={title} zoom={2} />
            </div>
          ))}
      </div>
      <div className="goods-single__info">
        <p className="title">{title}</p>
        <PriceLabel price={price} stockPrice={stockPrice} />
        {isExclusive ? (
          <div className="individual-tailoring">
            <p className="title">
              {TRANSLATE[locale as 'ru' | 'en'].tailoring}
            </p>
            <Form
              formikConfig={{
                initialValues:
                  !isServer && localStorage.getItem(id)
                    ? { ...JSON.parse(localStorage.getItem(id) as string) }
                    : FORMIK.goodsExclusive.values,
                validationSchema: FORMIK.goodsExclusive.validationSchema(
                  locale as 'ru' | 'en'
                ),
                onSubmit: (values) => {
                  localStorage.setItem(id, JSON.stringify(values));
                  addToCart(values);
                },
              }}
              types={FORMIK.goodsExclusive.types}
              suffixes={FORMIK.goodsExclusive.suffixes(locale as 'ru' | 'en')}
              placeholders={FORMIK.goodsExclusive.placeholders(
                locale as 'ru' | 'en'
              )}
              buttonTitle={TRANSLATE[locale as 'ru' | 'en'].addToCart}
            />
          </div>
        ) : sizes.length ? (
          <Form
            formikConfig={{
              initialValues: {
                size: sizes[0].forOrder
                  ? `${sizes[0].value} ${
                      TRANSLATE[locale as 'ru' | 'en'].sizeUnderOrder
                    }`
                  : sizes[0].value,
              },
              onSubmit: (values) => {
                localStorage.setItem(id, JSON.stringify(values.size));
                addToCart(values.size);
              },
            }}
            types={{
              size: 'select',
            }}
            placeholders={{}}
            selectOptions={{
              size: sizes.map((size) =>
                size.forOrder
                  ? `${size.value} ${
                      TRANSLATE[locale as 'ru' | 'en'].sizeUnderOrder
                    }`
                  : size.value
              ),
            }}
            buttonTitle={TRANSLATE[locale as 'ru' | 'en'].addToCart}
          />
        ) : (
          <div className="button-container">
            <button className="button" disabled>
              <p className="button__title">
                {TRANSLATE[locale as 'ru' | 'en'].outOfStock}
              </p>
            </button>
          </div>
        )}
        <div className="materials-container">
          {materials.map((material) => (
            <p key={material} className="material">
              {material}
            </p>
          ))}
        </div>
        <p className="description">{description}</p>
        <Link href={'/collections' + collectionLink}>
          <div className="back-to-collection">
            <div className="arrow" />
            <p>{TRANSLATE[locale as 'ru' | 'en'].backToCollection}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GoodsSingle;
