import Image from 'next/image';
import { ICockpitCarousel } from '../../cockpitTypes';
import Link from 'next/link';

const MainCarouselItem: React.FC<ICockpitCarousel> = ({
  title,
  link,
  image,
}) => {
  return (
    <Link href={link}>
      <div className="main-page-carousel-item">
        <Image
          className="main-page-carousel-item-image"
          layout="fill"
          objectFit="cover"
          objectPosition="left"
          loading="eager"
          src={process.env.NEXT_PUBLIC_COCKPIT_URL + image.path}
        />
        <h3 className="main-page-carousel-item-title">{title}</h3>
      </div>
    </Link>
  );
};

export default MainCarouselItem;
