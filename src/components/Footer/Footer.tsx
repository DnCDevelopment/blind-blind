import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FORMIK } from '../../constants/form';
import { TRANSLATE } from '../../constants/languages';
import Form from '../Form/Form';
import LinkList from './LinkList';
import SocialIcons from './SocialIcons';

const Footer: React.FC = () => {
  const { locale } = useRouter();

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
                onSubmit: (values) => console.log(values),
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
                // objectPosition="right"
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
            <Link href="/">
              {TRANSLATE[locale as 'ru' | 'en'].privacyPolicy}
            </Link>
          </p>
          <p className="public-contract">
            <Link href="/">
              {TRANSLATE[locale as 'ru' | 'en'].publicContract}
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
