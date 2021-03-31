import { useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';

import Modal from '../Modal/Modal';

import { MainStreetStyleSamplesProps } from './Types';

const MainStreetStyleSamples: React.FC<MainStreetStyleSamplesProps> = ({
  photos,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<string>('');
  return (
    <div className="street-style__wrapper">
      <Link href="/street-style">
        <h1 className="street-style__title">Street Style</h1>
      </Link>
      <div className="street-style__container container">
        {photos.map((photo) => (
          <div
            key={photo}
            role="presentation"
            onClick={() => {
              setModalPhoto(photo);
              setModalOpen(true);
            }}
            className="photo-container"
          >
            <Image
              layout="fill"
              objectFit="cover"
              alt="street-style photo"
              loading="eager"
              quality={100}
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
            />
          </div>
        ))}
      </div>
      {modalOpen &&
        createPortal(
          <Modal close={() => setModalOpen(false)}>
            <Image
              layout="fill"
              objectFit="contain"
              alt="street-style photo"
              loading="eager"
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + modalPhoto}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default MainStreetStyleSamples;
