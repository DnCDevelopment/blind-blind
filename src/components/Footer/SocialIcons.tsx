import Link from 'next/link';

import InstagramSVG from '../../assets/svg/instagram.svg';
import FacebookSVG from '../../assets/svg/facebook.svg';
import TwitterSVG from '../../assets/svg/twitter.svg';

const SocialIcons: React.FC = () => {
  return (
    <div className="social-icons">
      <div className="icon">
        <Link href="https://www.instagram.com/">
          <InstagramSVG />
        </Link>
      </div>
      <div className="icon">
        <Link href="https://www.facebook.com/">
          <FacebookSVG />
        </Link>
      </div>
      <div className="icon">
        <Link href="https://www.twitter.com/">
          <TwitterSVG />
        </Link>
      </div>
    </div>
  );
};

export default SocialIcons;
