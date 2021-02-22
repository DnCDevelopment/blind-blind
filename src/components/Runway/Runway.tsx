import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { IRunwayProps } from './Types';

const Runway: React.FC<IRunwayProps> = ({ title, photos, videoLink }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<string>('');

  return (
    <div className="runway narrow-container">
      <h1 className="runway__title">{title}</h1>
      <div className="runway__photos">
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
              alt={title + ' photo'}
              loading="eager"
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo}
            />
          </div>
        ))}
      </div>
      {videoLink && (
        <div className="video-container">
          <iframe
            className="video"
            title={videoLink}
            src={videoLink.replace('watch?v=', 'embed/')}
          ></iframe>
        </div>
      )}
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
