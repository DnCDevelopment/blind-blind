import Link from 'next/link';
import React, { useState } from 'react';

import { ISublistProps } from './Types';

const Sublist: React.FC<ISublistProps> = ({ data, closeMenu }) => {
  const [subsublistOpen, setSubsublistOpen] = useState<string>('');

  return (
    <div className="menu-sublist">
      {data.map(({ title, link, subsublist }) =>
        !subsublist ? (
          <Link href={link} key={title}>
            <a
              className="sublist-item"
              role="presentation"
              onClick={() => closeMenu()}
            >
              {title}
            </a>
          </Link>
        ) : (
          <React.Fragment key={title}>
            <p
              role="presentation"
              className="sublist-item"
              onClick={() =>
                setSubsublistOpen(subsublistOpen === title ? '' : title)
              }
            >
              {title}
            </p>
            {subsublistOpen === title && (
              <div className={title}>
                <Sublist data={subsublist} closeMenu={closeMenu} />
              </div>
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default Sublist;
