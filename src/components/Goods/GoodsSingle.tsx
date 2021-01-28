import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

import Form from '../Form/Form';
import PriceLabel from './PriceLabel';
import SizeDropdown from './SizeDropdown';
import Button from '../Button/Button';

import { TRANSLATE } from '../../constants/languages';
import { FormErrors } from '../../constants/formErrors';

import { IGoodsSingleProps } from './Types';
import Link from 'next/link';

const GoodsSingle: React.FC<IGoodsSingleProps> = ({
  title,
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
  const { locale } = useRouter();

  const [curSize, setCurSize] = useState(sizes[0]);

  const changeCurSize = (size: string) => {
    setCurSize(size);
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
        {typeof otherPhotos !== 'string' ? (
          otherPhotos.map(({ path }) => (
            <div key={path} className="other-photo">
              <Image
                layout="fill"
                objectFit="cover"
                loading="eager"
                src={process.env.NEXT_PUBLIC_COCKPIT_URL + path}
              />
            </div>
          ))
        ) : (
          <></>
        )}
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
                initialValues: {
                  growth: '',
                  bust: '',
                  waist: '',
                  hips: '',
                },
                validationSchema: Yup.object({
                  growth: Yup.number()
                    .min(100, FormErrors[locale as 'ru' | 'en'].tooSmall)
                    .max(300, FormErrors[locale as 'ru' | 'en'].tooLarge)
                    .required('Required!'),
                }),
                onSubmit: () => {
                  return;
                },
              }}
              masks={{
                growth: ['_', ' ', 'см'],
              }}
              placeholders={{
                growth: TRANSLATE[locale as 'ru' | 'en'].growth,
                bust: TRANSLATE[locale as 'ru' | 'en'].bustVolume,
                waist: TRANSLATE[locale as 'ru' | 'en'].waistVolume,
                hips: TRANSLATE[locale as 'ru' | 'en'].hipsVolume,
              }}
            />
          </div>
        ) : (
          <SizeDropdown
            curSize={curSize}
            sizes={sizes}
            changeCurSize={(size) => changeCurSize(size)}
          />
        )}
        <Button title={TRANSLATE[locale as 'ru' | 'en'].addToCart} />
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
