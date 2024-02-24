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
      <Link href={link} passHref>
        <a>
          <Image
            className="main-page-carousel-item-image"
            layout="fill"
            objectFit="cover"
            alt={title}
            objectPosition="left"
            loading="eager"
            quality={100}
            src={process.env.NEXT_PUBLIC_COCKPIT_URL + image.path}
          />
        </a>
      </Link>
    </div>
  );
};

export default MainCarouselItem;
