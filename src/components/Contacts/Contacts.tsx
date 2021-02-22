import { useRouter } from 'next/router';

import { IContactsProps } from './Types';

import { TRANSLATE } from '../../constants/languages';

const Contacts: React.FC<IContactsProps> = ({ email, phone }) => {
  const { locale } = useRouter();

  return (
    <>
      <h1>{TRANSLATE[locale as 'ru' | 'en'].contacts}</h1>
      <a href={`mailto:${email}`}>{email}</a>
      <a href={`tel:${phone}`}>{phone}</a>
    </>
  );
};

export default Contacts;
