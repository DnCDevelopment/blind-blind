import { useRouter } from 'next/router';

import { TRANSLATE } from '../../constants/languages';
import useCockpit from '../../hooks/useCockpit';
import { ICockpitGoodsEntries, ICockpitGoodsRaw } from '../../cockpitTypes';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import GoodsSearchItem from '../Goods/GoodsSearchItem';
import { ISearchInputProps } from './Types';

const SearchInput: React.FC<ISearchInputProps> = ({ close }) => {
  const { locale, defaultLocale } = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const [foundGoods, setFoundGoods] = useState<ICockpitGoodsRaw[]>([]);

  const { data: goods } = useCockpit<ICockpitGoodsEntries>(false);
  const goodsList = goods?.entries as ICockpitGoodsRaw[];

  const options = {
    includeScore: true,
    keys: ['title', 'title_en'],
  };

  const fuse = new Fuse(goodsList, options);

  useEffect(() => {
    if (goodsList)
      setFoundGoods(fuse.search(searchValue).map((result) => result.item));
  }, [searchValue, goodsList]);

  return (
    <div className="search-input-container">
      <input
        type="text"
        className="search-input"
        value={searchValue}
        placeholder={TRANSLATE[locale as 'ru' | 'en'].search}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div
        role="presentation"
        onClick={() => {
          setSearchValue('');
          close && close();
        }}
        className="search-result-container"
      >
        {foundGoods.map(
          ({ _id, previewImage, title, title_en, link, stockPrice, price }) => (
            <GoodsSearchItem
              key={_id}
              photo={previewImage.path}
              title={locale === defaultLocale ? title : title_en}
              link={link}
              price={stockPrice ? stockPrice : price}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SearchInput;
