import React from 'react';
import { IRunwayImageProps } from './Types';
import useImage from '../../hooks/useImage';

const RunwayImage: React.FC<IRunwayImageProps> = ({
  photo,
  onClick,
}): JSX.Element => {
  const { img, isLoad, onLoad } = useImage();
  return (
    <div
      key={photo}
      role="presentation"
      onClick={onClick}
      className={`photo-container ${isLoad ? '' : 'photo-container-loading'}`}
    >
      <div
        className={`photo-container-img-fallback ${
          isLoad ? 'photo-container-img-fallback-loaded' : ''
        }`}
      ></div>
      <img
        ref={img}
        className="photo-container-img"
        src={`/_next/image?url=${process.env.NEXT_PUBLIC_COCKPIT_URL}${photo}&w=1800&q=75`}
        loading="lazy"
        alt=""
        onLoad={onLoad}
      />
    </div>
  );
};

export default RunwayImage;
