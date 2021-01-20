import Carousel from '../Carousel/Carousel';
import MainCarouselItem from './MainCarouselItem';
import { IMainCarousel } from './Types';
import ArrowSVG from '../../assets/svg/arrow.svg';
import { useRouter } from 'next/router';

const MainCarousel: React.FC<IMainCarousel> = ({ carousel }): JSX.Element => {
  const { locale } = useRouter();
  return (
    <div className="main-page-carousel">
      <Carousel buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
        {carousel.map(({ _id, title, image, link }) => (
          <MainCarouselItem
            key={_id}
            title={title}
            image={image}
            link={locale + link}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MainCarousel;