import Image from 'next/image';
import Link from 'next/link';

import { ICockpitCarousel } from '../../cockpitTypes';

const MainCarouselItem: React.FC<ICockpitCarousel> = ({
  title,
  link,
  image,
}) => {
  return (
    <div className="main-page-carousel-item">
      <Image
        className="main-page-carousel-item-image"
        layout="fill"
        objectFit="cover"
        alt={title}
        objectPosition="left"
        loading="eager"
        src={process.env.NEXT_PUBLIC_COCKPIT_URL + image.path}
      />
      <Link href={link}>
        <h3 className="main-page-carousel-item-title">{title}</h3>
      </Link>
    </div>
  );
};

export default MainCarouselItem;
