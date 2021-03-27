import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import GoodsItem, { GoodsItemFallback } from './GoodsItem';
import Dropdown from '../Form/Dropdown';

import { ICockpitGoodsRaw } from '../../cockpitTypes';
import { IGoodsListProps } from './Types';

import { SORT_GOODS, SORT_TRANSLATE } from '../../constants/sortGoods';

const GOODS_ON_PAGE = 12;
const AVAILABLE_PAGES = 3;

const GoodsList: React.FC<IGoodsListProps> = ({ goods }) => {
  const [sortSelect, setSortSelect] = useState<keyof typeof SORT_TRANSLATE>(
    'default'
  );
  const router = useRouter();
  const { locale, query } = router;

  const [currentPage, setCurrentPage] = useState(0);
  const [visiblePages, setVisiblePages] = useState<Array<number>>([]);
  const [firstGoodsOnPageIndex, setFirstGoodsOnPageIndex] = useState(0);

  const filteredGoods = goods?.entries;

  const sortedGoods = SORT_GOODS[sortSelect](
    filteredGoods as ICockpitGoodsRaw[]
  );

  const maxPageNumber = Math.ceil(sortedGoods?.length / GOODS_ON_PAGE);

  useEffect(() => {
    setFirstGoodsOnPageIndex(currentPage * GOODS_ON_PAGE);
    if (maxPageNumber <= 1) setVisiblePages([]);
    else if (currentPage + 1 + AVAILABLE_PAGES >= maxPageNumber)
      setVisiblePages(
        [...Array(maxPageNumber).keys()].splice(
          maxPageNumber >= AVAILABLE_PAGES
            ? maxPageNumber - AVAILABLE_PAGES
            : 0,
          maxPageNumber
        )
      );
    else if (currentPage + 1 - AVAILABLE_PAGES <= 0)
      setVisiblePages(
        [...Array(maxPageNumber).keys()].splice(0, AVAILABLE_PAGES)
      );
    else
      setVisiblePages(
        [...Array(maxPageNumber).keys()].splice(
          currentPage - Math.floor(AVAILABLE_PAGES / 2),
          currentPage + Math.ceil(AVAILABLE_PAGES / 2) - 1
        )
      );
  }, [currentPage, maxPageNumber]);

  useEffect(() => {
    const page = query.page ? Number.parseInt(query.page as string) : 0;
    setCurrentPage(page && page < maxPageNumber ? page : 0);
  }, [query.page, maxPageNumber]);

  const changePage = (pageNum: number) => {
    const newQuery = router.query;
    if (!pageNum) {
      delete newQuery.page;
    } else {
      newQuery['page'] = pageNum.toString();
    }

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });

    window.scrollTo({ top: 0 });
  };

  const setSort = (item: string) => {
    setSortSelect(
      Object.keys(SORT_TRANSLATE).find(
        (key) =>
          SORT_TRANSLATE[key as keyof typeof SORT_TRANSLATE][
            locale as 'ru' | 'en'
          ] === item
      ) as keyof typeof SORT_TRANSLATE
    );
  };

  return (
    <div className="goods-list">
      <div className="input-select">
        <Dropdown
          value={SORT_TRANSLATE[sortSelect][locale as 'ru' | 'en']}
          values={Object.keys(SORT_TRANSLATE).map(
            (key) =>
              SORT_TRANSLATE[key as keyof typeof SORT_TRANSLATE][
                locale as 'ru' | 'en'
              ]
          )}
          setValue={setSort}
        />
      </div>
      <div className="goods-list__goods-container">
        {sortedGoods
          .slice(firstGoodsOnPageIndex, firstGoodsOnPageIndex + GOODS_ON_PAGE)
          .map(
            ({
              _id,
              title,
              price,
              stockPrice,
              link,
              previewImage,
              secondImage,
            }) => (
              <GoodsItem
                key={_id}
                title={title}
                link={link}
                photo={previewImage.path}
                secondPhoto={secondImage.path}
                price={price}
                stockPrice={stockPrice}
              />
            )
          )}
      </div>
      <div className="goods-list__pages-buttons">
        {currentPage > 0 && (
          <div
            role="presentation"
            onClick={() => changePage(currentPage - 1)}
            className="chevron-left"
          ></div>
        )}
        {visiblePages.map((pageNum) => (
          <div key={pageNum} className="page-number">
            <p
              role="presentation"
              onClick={() => changePage(pageNum)}
              className={pageNum === currentPage ? 'selected' : ''}
            >
              {pageNum + 1}
            </p>
          </div>
        ))}
        {currentPage < maxPageNumber - 1 && (
          <div
            role="presentation"
            onClick={() => changePage(currentPage + 1)}
            className="chevron-right"
          ></div>
        )}
      </div>
    </div>
  );
};

export const GoodsListFallback = () => {
  return (
    <div className="goods-list-fallback">
      <div className="goods-list-fallback__goods-container">
        {Array.from({ length: 9 }, (_, index) => (
          <GoodsItemFallback key={index} />
        ))}
      </div>
    </div>
  );
};

export default GoodsList;
