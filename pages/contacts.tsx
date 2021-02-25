import { GetServerSideProps, NextPage } from 'next';

import Contacts from '../src/components/Contacts/Contacts';
import SalesPlaces from '../src/components/Contacts/SalesPlaces';
import Seo from '../src/components/Seo/Seo';

import { getCockpitCollection } from '../src/utils/getCockpitData';

import { ICockpitContacts, ICockpitSalesPlaceRow } from '../src/cockpitTypes';
import { IContactsPageProps } from '../src/pagesTypes';

import { SEO_ITEMS } from '../src/constants/seoItems';

const ContactsPage: NextPage<IContactsPageProps> = ({
  contacts,
  salesPlaces,
  locale,
}) => (
  <div className="contacts-page-container">
    <Seo
      title={SEO_ITEMS[locale].contactsPage.title}
      description={SEO_ITEMS[locale].contactsPage.title}
      breadcrumbs={[
        {
          title: SEO_ITEMS[locale].contactsPage.breadcrumbName,
          link: SEO_ITEMS[locale].contactsPage.link,
        },
      ]}
      lang={locale}
      path={SEO_ITEMS[locale].contactsPage.link}
    />
    <Contacts email={contacts.email} phone={contacts.phone} />
    <SalesPlaces places={salesPlaces} />
  </div>
);

export default ContactsPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const cockpitDataContacts = await getCockpitCollection('Contacts');
  const cockpitDataSalesPlaces = await getCockpitCollection('salesPlaces');

  const contacts: ICockpitContacts = {
    email: cockpitDataContacts.entries[0].email,
    phone: cockpitDataContacts.entries[0].phone,
  };

  const salesPlaces = cockpitDataSalesPlaces.entries.map(
    (el: ICockpitSalesPlaceRow) => ({
      email: el.email,
      city: locale === defaultLocale ? el.city : el.city_en,
      address: locale === defaultLocale ? el.address : el.address_en,
      picture: el.picture,
      phone: el.phone,
    })
  );

  return {
    props: {
      contacts,
      salesPlaces,
      locale,
    },
  };
};
