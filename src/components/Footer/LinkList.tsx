import Link from 'next/link';
import { useRouter } from 'next/router';

import { footerMenu } from '../../constants/footerMenu';

const LinkList: React.FC = () => {
  const { locale } = useRouter();

  const menu = footerMenu(locale as 'ru' | 'en');

  return (
    <div className="link-list">
      <ul>
        {menu.map(({ link, title }) => (
          <li key={title}>
            <Link href={link}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;
