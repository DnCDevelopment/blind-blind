import Image from 'next/image';
import Link from 'next/link';

import { ICollectionSamplesProps } from './Types';

const CollectionSamples: React.FC<ICollectionSamplesProps> = ({
  title,
  link,
  samples,
}) => {
  return (
    <div className="collection-samples">
      <Link href={link}>
        <h3 className="collection-samples__title">{title}</h3>
      </Link>
      <div className="collection-samples__goods container">
        {samples
          .slice(0, 3)
          .map(({ _id, previewImage, title, secondImage, link }) => (
            <Link key={_id} href={`/goods${link}`}>
              <div className="collection-samples__goods-item">
                <div className="collection-samples__goods-photos">
                  <Image
                    className="collection-samples__goods-photos__preview"
                    layout="fill"
                    objectFit="cover"
                    alt={title}
                    loading="eager"
                    src={
                      process.env.NEXT_PUBLIC_COCKPIT_URL + previewImage.path
                    }
                  />
                  <Image
                    className="collection-samples__goods-photos__second"
                    layout="fill"
                    objectFit="cover"
                    alt={title}
                    loading="eager"
                    src={process.env.NEXT_PUBLIC_COCKPIT_URL + secondImage.path}
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
