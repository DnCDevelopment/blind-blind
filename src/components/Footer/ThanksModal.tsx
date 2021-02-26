/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';

import Modal from '../Modal/Modal';

import Success from '../../assets/svg/success.svg';
import Failed from '../../assets/svg/failed.svg';
import Close from '../../assets/svg/close.svg';

import { TRANSLATE } from '../../constants/languages';

import { IThanksModalProps } from './Types';

const ThanksModal: React.FC<IThanksModalProps> = ({
  isSuccess,
  showModal,
  handleShowModal,
}): JSX.Element => {
  const { locale } = useRouter();

  return (
    <>
      {showModal &&
        createPortal(
          <Modal close={() => handleShowModal(false)}>
            <div className="thanks-modal">
              <div className="close" onClick={() => handleShowModal(false)}>
                <Close />
              </div>
              <div className="thanks">
                <div className="thanks-icon">
                  {isSuccess ? <Success /> : <Failed />}
                </div>
                {
                  TRANSLATE[locale as 'ru' | 'en'][
                    isSuccess ? 'successOrder' : 'failedOrder'
                  ]
                }
              </div>
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ThanksModal;
