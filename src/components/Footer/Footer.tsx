import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Form from '../Form/Form';
import LinkList from './LinkList';
import SocialIcons from './SocialIcons';
import ThanksModal from './ThanksModal';

import { FORMIK } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';

const Footer: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);

  const { locale } = useRouter();

  const handleShowModal = (success = false) => {
    setShowModal(!showModal);
    setSuccess(success);
    document.body.classList.toggle('hide-overflow');
  };

  return (
    <div className="container">
      <footer className="footer">
        <div className="links-and-form">
          <div className="link-list-wrapper">
            <LinkList />
            <SocialIcons />
          </div>
          <div className="request-callback">
            <p className="request-callback__title">
              {TRANSLATE[locale as 'ru' | 'en'].requestCallBackTitle}
            </p>
            <Form
              formikConfig={{
                initialValues: FORMIK.footerForm.values,
                validationSchema: FORMIK.footerForm.validationSchema(
                  locale as 'ru' | 'en'
                ),
                onSubmit: ({ phone }, { resetForm }) => {
                  fetch('/api/request', {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                      phone,
                    }),
                  })
                    .then((res) => {
                      if (!res.ok) {
                        throw Error(res.statusText);
                      }
                      handleShowModal(true);
                      resetForm();
                    })
                    .catch(() => handleShowModal(false));
                },
              }}
              types={FORMIK.footerForm.types}
              placeholders={FORMIK.footerForm.placeholders(
                locale as 'ru' | 'en'
              )}
              buttonTitle={TRANSLATE[locale as 'ru' | 'en'].requestCallBack}
              masks={{ phone: '999 999 99 99' }}
            />
            <div className="payments-image">
              <Image
                layout="fill"
                objectFit="contain"
                loading="eager"
                src="/png/payments.png"
              />
            </div>
          </div>
        </div>
        <div className="copyright-wrapper">
          <p className="copyright">
            {TRANSLATE[locale as 'ru' | 'en'].copyright}
          </p>
          <p className="privacy-policy">
            <Link href="/page/privacy-policy">
              {TRANSLATE[locale as 'ru' | 'en'].privacyPolicy}
            </Link>
          </p>
          <p className="public-contract">
            <Link href="/page/public-contract">
              {TRANSLATE[locale as 'ru' | 'en'].publicContract}
            </Link>
          </p>
        </div>
      </footer>
      <ThanksModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        isSuccess={success}
      />
    </div>
  );
};

export default Footer;
