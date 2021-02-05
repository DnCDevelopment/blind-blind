import Link from 'next/link';
import { useRouter } from 'next/router';

const Logo: React.FC = () => {
  const { locale } = useRouter();
  return (
    <Link href={locale === 'ru' ? '/' : '/en'}>
      <h1 className="logo">Blind-Blind</h1>
    </Link>
  );
};

export default Logo;
