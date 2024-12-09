import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { TRANSLATE } from '../../constants/languages';
import { ICollectionSamplesProps } from './Types';

const CollectionSamples: React.FC<ICollectionSamplesProps> = ({
  title,
  link,
  samples,
}) => {
  const { locale } = useRouter();
  return (
    <div className="collection-samples">
      <Link href={link}>
        <h3 className="collection-samples__title-main">{title}</h3>
      </Link>
      <div className="collection-samples__goods container">
        {samples.map(({ _id, previewImage, title, secondImage, link }) => (
          <Link key={_id} href={`/goods${link}`}>
            <div className="collection-samples__goods-item">
              <div className={`collection-samples__goods-photos `}>
                <Image
                  layout="fill"
                  objectFit="contain"
                  className="collection-samples__goods-photos__preview"
                  alt={title}
                  loading="eager"
                  quality={40}
                  src={`${process.env.NEXT_PUBLIC_COCKPIT_URL}${previewImage.path}`}
                />
                {secondImage && secondImage.path && (
                  <div className="collection-samples__goods-photos__second">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      alt={title}
                      priority
                      quality={40}
                      src={`${process.env.NEXT_PUBLIC_COCKPIT_URL}${secondImage.path}`}
                    />
                  </div>
                )}
              </div>
              <p className="collection-samples__goods-title">{title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="collection-samples__button-wrapper">
        <Link href={link}>
          <h3 className="collection-samples__button">
            {TRANSLATE[locale as 'ru' | 'en'].goToCollection}
            <div className="arrow" />
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default CollectionSamples;
