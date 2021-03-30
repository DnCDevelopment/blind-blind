import Carousel from '../Carousel/Carousel';
import MainCarouselItem from './MainCarouselItem';

import { IMainCarousel } from './Types';

import ArrowSVG from '../../assets/svg/arrow.svg';

const MainCarousel: React.FC<IMainCarousel> = ({ carousel }): JSX.Element => (
  <div className="main-page-carousel">
    <Carousel buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
      {carousel.map(({ title, image, link }, index) => (
        <MainCarouselItem
          key={link + index}
          title={title}
          image={image}
          link={link}
        />
      ))}
    </Carousel>
  </div>
);

export default MainCarousel;
