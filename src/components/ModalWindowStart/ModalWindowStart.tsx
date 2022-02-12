/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Modal from '../Modal/Modal';
import Close from '../../assets/svg/close.svg';
import { useRouter } from 'next/router';
import { TRANSLATE } from '../../constants/languages';
import Form from '../Form/Form';
import { FORMIK } from '../../constants/form';

const ModalWindowStart: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [wasModalOpened, setWasModalOpened] = useState<boolean>(false);
  const { locale } = useRouter();
  const handleShowModal = () => {
    setModalOpen(!modalOpen);
    localStorage.setItem('wasModalOpened', 'true');
    document.body.classList.toggle('hide-overflow');
  };

  useEffect(() => {
    if (localStorage.getItem('wasModalOpened')) setWasModalOpened(true);
  }, []);

  useEffect(() => {
    if (!wasModalOpened) {
      const startTimeout = () => {
        return setTimeout(() => {
          handleShowModal();
        }, 1000);
      };
      const timeout = startTimeout();

      return () => clearTimeout(timeout);
    }
  }, [wasModalOpened]);

  return (
    <>
      {modalOpen &&
        createPortal(
          <div className="window-start">
            <Modal>
              <div className="window-start__wrapper">
                <div
                  className="close"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowModal();
                  }}
                >
                  <Close />
                </div>
                <div className="window-start__container">
                  <h1 className="window-start__title">blind</h1>
                  <p className="window-start__text">
                    {TRANSLATE[locale as 'ru' | 'en'].modalWindowStartText}
                  </p>
                  <Form
                    formikConfig={{
                      initialValues: FORMIK.modalStartForm.values,
                      validationSchema: FORMIK.modalStartForm.validationSchema(
                        locale as 'ru' | 'en'
                      ),
                      onSubmit: (
                        { firstName, email, phone, dob },
                        { resetForm }
                      ) => {
                        fetch('/api/subscription', {
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          method: 'POST',
                          body: JSON.stringify({
                            firstName,
                            email,
                            phone,
                            dob,
                          }),
                        }).then((res) => {
                          if (!res.ok) {
                            throw Error(res.statusText);
                          }
                          resetForm();
                          handleShowModal();
                        });
                      },
                    }}
                    types={FORMIK.modalStartForm.types}
                    placeholders={FORMIK.modalStartForm.placeholders(
                      locale as 'ru' | 'en'
                    )}
                    buttonTitle={TRANSLATE[locale as 'ru' | 'en'].subscribe}
                  />
                </div>
              </div>
            </Modal>
          </div>,
          document.body
        )}
    </>
  );
};

export default ModalWindowStart;
