import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ICollectionSamplesProps } from './Types';

const CollectionSamples: React.FC<ICollectionSamplesProps> = ({
  title,
  link,
  samples,
}) => {
  const [isLoad, setLoad] = useState<boolean>(false);
  return (
    <div className="collection-samples">
      <Link href={link}>
        <h3 className="collection-samples__title">{title}</h3>
      </Link>
      <div className="collection-samples__goods container">
        {samples.map(({ _id, previewImage, title, secondImage, link }) => (
          <Link key={_id} href={`/goods${link}`}>
            <div className="collection-samples__goods-item">
              <div
                className={`collection-samples__goods-fallback-photos ${
                  isLoad ? 'not-load' : 'load'
                }`}
              />
              <div
                className={`collection-samples__goods-photos ${
                  isLoad ? 'load' : 'not-load'
                }`}
              >
                <Image
                  className="collection-samples__goods-photos__preview"
                  layout="fill"
                  objectFit="contain"
                  alt={title}
                  quality={50}
                  priority={true}
                  src={process.env.NEXT_PUBLIC_COCKPIT_URL + previewImage.path}
                  onLoad={() => setLoad(true)}
                />
                <Image
                  className="collection-samples__goods-photos__second"
                  layout="fill"
                  objectFit="contain"
                  alt={title}
                  quality={50}
                  priority={true}
                  src={process.env.NEXT_PUBLIC_COCKPIT_URL + secondImage.path}
                  onLoad={() => setLoad(true)}
                />
              </div>
              <p className="collection-samples__goods-title">{title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionSamples;
