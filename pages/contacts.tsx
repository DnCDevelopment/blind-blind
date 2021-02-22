import { GetServerSideProps, NextPage } from 'next';

import Contacts from '../src/components/Contacts/Contacts';
import SalesPlaces from '../src/components/Contacts/SalesPlaces';

import { getCockpitCollection } from '../src/utils/getCockpitData';

import { ICockpitContacts, ICockpitSalesPlaceRow } from '../src/cockpitTypes';
import { IContactsPageProps } from '../src/pagesTypes';

const ContactsPage: NextPage<IContactsPageProps> = ({
  contacts,
  salesPlaces,
}) => (
  <div className="contacts-page-container">
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
    },
  };
};
