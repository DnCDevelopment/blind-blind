import { useRouter } from 'next/router';
import { TRANSLATE } from '../../constants/languages';
import { ICartGoodsItemDetailsProps } from './Types';

const CartGoodsItemDetails: React.FC<ICartGoodsItemDetailsProps> = ({
  details,
}) => {
  const { locale } = useRouter();

  return (
    <div className="details">
      {typeof details == 'string' ? (
        <p>{details}</p>
      ) : (
        Object.keys(details).map((key, idx) => (
          <p key={idx}>
            {
              [
                TRANSLATE[locale as 'ru' | 'en'].growth,
                TRANSLATE[locale as 'ru' | 'en'].bustVolume,
                TRANSLATE[locale as 'ru' | 'en'].waistVolume,
                TRANSLATE[locale as 'ru' | 'en'].hipsVolume,
              ][idx]
            }
            : {details[key]} {TRANSLATE[locale as 'ru' | 'en'].cm}
          </p>
        ))
      )}
    </div>
  );
};

export default CartGoodsItemDetails;
