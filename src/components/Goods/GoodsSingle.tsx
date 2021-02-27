import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Form from '../Form/Form';
import PriceLabel from './PriceLabel';
import { cartContext } from '../../context/cartContext';

import { TRANSLATE } from '../../constants/languages';
import { FORMIK } from '../../constants/form';

import { IGoodsSingleProps } from './Types';
import { ICartContext } from '../../context/Types';
import { FormikValues } from 'formik';
import ZoomImage from './ZoomImage';

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
    router.push('/cart');
  };

  return (
    <div className="goods-single">
      <div className="goods-single__gallery">
        <div className="first-photo">
          <ZoomImage image={photo} alt={title} zoom={2} />
        </div>
        <div className="second-photo">
          <ZoomImage image={secondPhoto} alt={title} zoom={2} />
        </div>
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
        ) : (
          <Form
            formikConfig={{
              initialValues: {
                size: sizes[0],
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
              size: sizes,
            }}
            buttonTitle={TRANSLATE[locale as 'ru' | 'en'].addToCart}
          />
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
