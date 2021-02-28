import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Modal from '../Modal/Modal';

import { ICelebritiesProps } from './Types';

import { TRANSLATE } from '../../constants/languages';

const Celebrities: React.FC<ICelebritiesProps> = ({ celebrities }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<string>('');

  const { locale } = useRouter();

  return (
    <div className="celebrities container">
      <h1 className="celebrities__title">
        {TRANSLATE[locale as 'ru' | 'en'].celebrities}
      </h1>
      <div className="celebrities__celebrities-container">
        {celebrities.map(({ name, proffesion, photo }) => (
          <div key={name} className="celebrity-item">
            <div
              role="presentation"
              onClick={() => {
                setModalPhoto(photo.path);
                setModalOpen(true);
              }}
              className="photo-container"
            >
              <Image
                layout="fill"
                objectFit="cover"
                alt={name}
                loading="eager"
                src={process.env.NEXT_PUBLIC_COCKPIT_URL + photo.path}
              />
            </div>
            <p className="name">{name}</p>
            <p className="proffesion">{proffesion}</p>
          </div>
        ))}
      </div>
      {modalOpen &&
        createPortal(
          <Modal close={() => setModalOpen(false)}>
            <Image
              layout="fill"
              objectFit="contain"
              loading="eager"
              src={process.env.NEXT_PUBLIC_COCKPIT_URL + modalPhoto}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default Celebrities;
