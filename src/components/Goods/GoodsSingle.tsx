import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import * as Yup from 'yup';

import Form from '../Form/Form';
import PriceLabel from './PriceLabel';
import { cartContext } from '../../context/cartContext';

import { TRANSLATE } from '../../constants/languages';
import { FORM } from '../../constants/form';

import { IGoodsSingleProps } from './Types';
import { ICartContext } from '../../context/Types';
import { FormikValues } from 'formik';

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
          <Image
            layout="fill"
            objectFit="cover"
            loading="eager"
            src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
          />
        </div>
        <div className="second-photo">
          <Image
            layout="fill"
            objectFit="cover"
            loading="eager"
            src={process.env.NEXT_PUBLIC_COCKPIT_URL + secondPhoto}
          />
        </div>
        {typeof otherPhotos !== 'string' &&
          otherPhotos.map(({ path }) => (
            <div key={path} className="other-photo">
              <Image
                layout="fill"
                objectFit="cover"
                loading="eager"
                src={process.env.NEXT_PUBLIC_COCKPIT_URL + path}
              />
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
                    : {
                        growth: '',
                        bust: '',
                        waist: '',
                        hips: '',
                      },
                validationSchema: Yup.object({
                  growth: Yup.number()
                    .min(100, FORM[locale as 'ru' | 'en'].tooSmall)
                    .max(300, FORM[locale as 'ru' | 'en'].tooLarge)
                    .required(FORM[locale as 'ru' | 'en'].required)
                    .typeError(FORM[locale as 'ru' | 'en'].wrongInput),
                  bust: Yup.number()
                    .min(20, FORM[locale as 'ru' | 'en'].tooSmall)
                    .max(200, FORM[locale as 'ru' | 'en'].tooLarge)
                    .required(FORM[locale as 'ru' | 'en'].required)
                    .typeError(FORM[locale as 'ru' | 'en'].wrongInput),
                  waist: Yup.number()
                    .min(20, FORM[locale as 'ru' | 'en'].tooSmall)
                    .max(200, FORM[locale as 'ru' | 'en'].tooLarge)
                    .required(FORM[locale as 'ru' | 'en'].required)
                    .typeError(FORM[locale as 'ru' | 'en'].wrongInput),
                  hips: Yup.number()
                    .min(20, FORM[locale as 'ru' | 'en'].tooSmall)
                    .max(200, FORM[locale as 'ru' | 'en'].tooLarge)
                    .required(FORM[locale as 'ru' | 'en'].required)
                    .typeError(FORM[locale as 'ru' | 'en'].wrongInput),
                }),
                onSubmit: (values) => {
                  localStorage.setItem(id, JSON.stringify(values));
                  addToCart(values);
                },
              }}
              types={{
                growth: 'text',
                bust: 'text',
                waist: 'text',
                hips: 'text',
              }}
              suffixes={{
                growth: TRANSLATE[locale as 'ru' | 'en'].cm,
                bust: TRANSLATE[locale as 'ru' | 'en'].cm,
                waist: TRANSLATE[locale as 'ru' | 'en'].cm,
                hips: TRANSLATE[locale as 'ru' | 'en'].cm,
              }}
              placeholders={{
                growth: TRANSLATE[locale as 'ru' | 'en'].growth,
                bust: TRANSLATE[locale as 'ru' | 'en'].bustVolume,
                waist: TRANSLATE[locale as 'ru' | 'en'].waistVolume,
                hips: TRANSLATE[locale as 'ru' | 'en'].hipsVolume,
              }}
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
