/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef, RefObject } from 'react';
import { ICarouselProps } from './Types';
const TRANSITION = 500;

const Carousel: React.FC<ICarouselProps> = ({
  children,
  infinity = true,
  buttonPrev,
  buttonNext,
  withRange,
  withDots,
  callback,
}): JSX.Element => {
  const carousel = useRef<HTMLDivElement>();
  const [slide, setSlide] = useState(0);

  const handleNextSlide = () => {
    if (slide + 1 < children.length) setSlide(slide + 1);
    else if (infinity) {
      setSlide(slide + 1);
      setTimeout(() => {
        if (carousel.current) carousel.current.style.transition = 'none';
        setSlide(0);
        setTimeout(() => {
          if (carousel.current)
            carousel.current.style.transition = `transform ${TRANSITION}ms`;
        }, 10);
      }, TRANSITION + 100);
    }
  };

  const handlePrevSlide = () => {
    if (slide - 1 >= 0) {
      setSlide(slide - 1);
    } else if (infinity) {
      setSlide(slide - 1);
      setTimeout(() => {
        if (carousel.current) carousel.current.style.transition = 'none';
        setSlide(children.length - 1);
        setTimeout(() => {
          if (carousel.current)
            carousel.current.style.transition = `transform ${TRANSITION}ms`;
        }, 10);
      }, TRANSITION + 100);
    }
  };

  const handleTouch = () => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      const { screenX } = e.touches[0];
      startX = screenX;
      if (carousel.current) carousel.current.style.transition = 'none';
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { screenX } = e.changedTouches[0];
      const { offsetWidth = 0 } = carousel.current ?? {};
      const delta = screenX - startX;
      if (
        infinity ||
        (!(slide === children.length - 1 && delta < 0) &&
          !(slide === 0 && delta > 0))
      )
        if (carousel.current)
          carousel.current.style.transform = `translateX(${
            -offsetWidth * (slide + +infinity * children.length) + delta
          }px)`;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { screenX } = e.changedTouches[0];
      const delta = screenX - startX;
      if (carousel.current)
        carousel.current.style.transition = `transform ${TRANSITION}ms`;
      if (delta < -40) handleNextSlide();
      else if (delta > 40) handlePrevSlide();
      else if (carousel.current)
        carousel.current.style.transform = `translateX(-${
          100 * (slide + +infinity * children.length)
        }%)`;
    };
    if (carousel.current) {
      carousel.current.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      carousel.current.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      carousel.current.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      });
    }

    return () => {
      if (carousel.current) {
        carousel.current.removeEventListener('touchstart', handleTouchStart);
        carousel.current.removeEventListener('touchmove', handleTouchMove);
        carousel.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  };

  useEffect(() => {
    if (carousel.current)
      carousel.current.style.transform = `translateX(-${
        100 * (slide + +infinity * children.length)
      }%)`;
    const touchcleanUp = handleTouch();
    if (callback) callback(slide);
    return () => {
      touchcleanUp();
    };
  }, [slide]);

  return (
    <div className="carousel">
      <div
        className="carousel-list"
        ref={carousel as RefObject<HTMLDivElement>}
        style={{
          transition: `transform ${TRANSITION}ms`,
        }}
      >
        {infinity &&
          children.map((child, idx) => (
            <div key={idx} className="carousel-list-item">
              {child}
            </div>
          ))}
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`carousel-list-item ${
              idx === slide ? 'carousel-list-item-current' : ''
            }`}
          >
            {child}
          </div>
        ))}
        {infinity &&
          children.map((child, idx) => (
            <div key={idx} className="carousel-list-item">
              {child}
            </div>
          ))}
      </div>
      <div className="carousel-buttons">
        <div
          role="presentation"
          className="carousel-buttons-prev"
          onClick={handlePrevSlide}
        >
          {buttonPrev}
        </div>
        <div
          role="presentation"
          className="carousel-buttons-next"
          onClick={handleNextSlide}
        >
          {buttonNext}
        </div>
      </div>
      {withRange && (
        <div className="carousel-range">
          <span className="carousel-range-number">01</span>
          <input
            className="carousel-range-input"
            value={slide}
            type="range"
            min="0"
            max={children.length - 1}
            step="1"
            onChange={({ target: { value } }) => {
              setSlide(+value);
            }}
          />
          <span className="carousel-range-number">{`${
            children.length < 10 ? 0 : ''
          }${children.length}`}</span>
        </div>
      )}
      {withDots && (
        <div className="carousel-dots">
          {children.map((_, idx) => (
            <div
              key={idx}
              role="presentation"
              className={`carousel-dots-item ${
                idx === slide ? 'carousel-dots-item-current' : ''
              }`}
              onClick={() => setSlide(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
