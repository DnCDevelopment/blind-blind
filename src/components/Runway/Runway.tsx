import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useState } from 'react';

import Modal from '../Modal/Modal';

import { IRunwayProps } from './Types';
import RunwayImage from './RunwayImage';

const Runway: React.FC<IRunwayProps> = ({ title, photos, videoLinks }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<string>('');

  return (
    <div className="runway narrow-container">
      <h1 className="runway__title">{title}</h1>
      <div className="runway__photos">
        {photos.map((photo) => (
          <RunwayImage
            key={photo}
            photo={photo}
            onClick={() => {
              setModalPhoto(photo);
              setModalOpen(true);
            }}
          />
        ))}
      </div>
      {!!videoLinks?.length &&
        videoLinks.map((link) => (
          <div key={link} className="video-container">
            <iframe className="video" title={link} src={link} />
          </div>
        ))}
      {modalOpen &&
        createPortal(
          <Modal close={() => setModalOpen(false)}>
            <Image
              layout="fill"
              objectFit="contain"
              alt={title + ' photo'}
              loading="eager"
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + modalPhoto}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default Runway;
