import React, { useState, useEffect } from 'react';
import ArrowSVG from '../../assets/svg/arrow.svg';
import { UTM_TAGS } from '../../constants/utmTags';

const ArrowUp: React.FC = () => {
  const [isArrowVisible, changeArrowVisability] = useState(false);
  const handleScrollTop = () =>
    typeof window !== 'undefined' &&
    window.scrollTo({ top: 0, behavior: 'smooth' });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      UTM_TAGS.forEach((tag) => {
        const value = urlParams.get(tag);
        if (value) {
          document.cookie = `${tag}=${value}; path=/;`;
        }
      });

      navigator.geolocation.getCurrentPosition((position) => {
        const {
          coords: { latitude, longitude },
        } = position;
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        )
          .then((res) => res.json())
          .then((result) => {
            document.cookie = `user_geo=${result.countryName}, ${result.city}; path=/;`;
          })
          .catch(console.error);
      });
    }

    const scrollHandler = () => {
      typeof window !== 'undefined' &&
        changeArrowVisability(() => window.scrollY > 0);
    };

    typeof window !== 'undefined' &&
      window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  return (
    <button
      className={`arrow-up ${isArrowVisible ? 'arrow-up-visible' : ''}`}
      onClick={handleScrollTop}
    >
      <ArrowSVG />
    </button>
  );
};

export default ArrowUp;
