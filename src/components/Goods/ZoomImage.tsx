import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { IZoomImageProps } from './Types';

const ZoomImage: React.FC<IZoomImageProps> = ({ image, alt, zoom }) => {
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [isLoad, setLoad] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeImageTransformation = (e: MouseEvent): void => {
      const imageContainerProps = imageContainerRef.current?.getBoundingClientRect() as DOMRect;

      const imageElement = imageContainerRef.current?.getElementsByClassName(
        'image'
      )[0] as HTMLImageElement;

      const transforming = `scale(${zoom})`;

      const xbias = -(
        ((e.x - imageContainerProps.x) / imageContainerProps.width) * 100 -
        50
      );

      const ybias = -(
        ((e.y - imageContainerProps.y) / imageContainerProps.height) * 100 -
        50
      );
      imageElement.style.transform =
        `translate(${
          (Math.abs(xbias) > 50 ? Math.sign(xbias) * 50 : xbias) * (zoom - 1)
        }%, ${
          (Math.abs(ybias) > 50 ? Math.sign(ybias) * 50 : ybias) * (zoom - 1)
        }%) ` + transforming;
    };

    const handleMouseClick = (e: MouseEvent): void => {
      const imageElement = imageContainerRef.current?.getElementsByClassName(
        'image'
      )[0] as HTMLImageElement;
      imageElement.style.transition = 'transform 0.1s ease-in';
      imageElement.style.transform = '';

      if (zoomed) {
        setZoomed(false);
      } else {
        if (
          imageContainerRef.current &&
          imageContainerRef.current.contains(e.target as Node)
        ) {
          imageElement.style.transition = 'transform 0.1s ease-in';
          setTimeout(() => {
            imageElement.style.transition = '';
          }, 100);

          setZoomed(true);
          changeImageTransformation(e);
        }
      }
    };

    const onMouseMove = (e: MouseEvent): void => {
      if (zoomed) {
        changeImageTransformation(e);
      }
    };

    document.addEventListener('click', handleMouseClick);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('click', handleMouseClick);
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  return (
    <div
      ref={imageContainerRef}
      className={`zoom-image ${zoomed ? 'zoom' : ''}`}
    >
      <div
        className={`zoom-image__preview ${isLoad ? 'not-load' : 'load'}`}
      ></div>
      <Image
        layout="fill"
        objectFit="cover"
        alt={alt}
        quality={75}
        priority={true}
        src={process.env.NEXT_PUBLIC_COCKPIT_URL + image}
        className={`image ${isLoad ? 'load' : 'not-load'}`}
        onLoad={() => setLoad(true)}
      />
    </div>
  );
};

export default ZoomImage;
