import Link from 'next/link';

import { ISublistProps } from './Types';

const Sublist: React.FC<ISublistProps> = ({ data }) => {
  return (
    <div className="menu-sublist">
      {data.map(({ title, link }) =>
        link ? (
          <Link href={link} key={title}>
            {title}
          </Link>
        ) : (
          <a key={title}>{title}</a>
        )
      )}
    </div>
  );
};

export default Sublist;
