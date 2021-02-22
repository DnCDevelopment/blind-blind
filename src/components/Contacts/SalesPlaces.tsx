import Image from 'next/image';

import { ISalesPlacesProps } from './Types';

const SalesPlaces: React.FC<ISalesPlacesProps> = ({ places }) => (
  <div className="sales-places-container">
    {places.map(({ address, city, email, picture, phone }) => (
      <div className="sales-place" key={address}>
        <div className="sales-place-image">
          <Image
            layout="fill"
            objectFit="cover"
            alt={address}
            loading="eager"
            src={process.env.NEXT_PUBLIC_COCKPIT_URL + picture.path}
          />
        </div>
        <p>{city}</p>
        <p>{address}</p>
        <a href={`mailto:${email}`}>{email}</a>
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
    ))}
  </div>
);

export default SalesPlaces;
