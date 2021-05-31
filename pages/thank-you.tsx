import { NextPage } from 'next';
import { useEffect } from 'react';

import ThankYou from '../src/components/ThankYou/ThankYou';

const ThankYouPage: NextPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof fbq !== 'undefined')
      fbq('track', 'Lead');
  }, []);
  return (
    <div className="thank-you-page">
      <ThankYou />
    </div>
  );
};

export default ThankYouPage;
