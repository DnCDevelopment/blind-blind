import Link from 'next/link';

import { ICollectionSamplesProps } from './Types';
import useImage from '../../hooks/useImage';

const CollectionSamples: React.FC<ICollectionSamplesProps> = ({
  title,
  link,
  samples,
}) => {
  const { img, isLoad, onLoad } = useImage();
  return (
    <div className="collection-samples">
      <Link href={link}>
        <h3 className="collection-samples__title-main">{title}</h3>
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
                <img
                  ref={img}
                  className="collection-samples__goods-photos__preview"
                  alt={title}
                  src={`/_next/image?url=${process.env.NEXT_PUBLIC_COCKPIT_URL}${previewImage.path}&w=1800&q=50`}
                  onLoad={onLoad}
                />
                {secondImage && secondImage.path && (
                  <img
                    className="collection-samples__goods-photos__second"
                    src={`/_next/image?url=${process.env.NEXT_PUBLIC_COCKPIT_URL}${secondImage.path}&w=1800&q=50`}
                    alt={title}
                  />
                )}
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
