import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import GoodsItem, { GoodsItemFallback } from './GoodsItem';
import Dropdown from '../Form/Dropdown';

import { ICockpitGoodsRaw } from '../../cockpitTypes';
import { IGoodsListProps } from './Types';

import SuccessSVG from '../../assets/svg/success.svg';
import CrossSVG from '../../assets/svg/cross.svg';

import { SORT_GOODS, SORT_TRANSLATE } from '../../constants/sortGoods';
import { TRANSLATE } from '../../constants/languages';

const GOODS_ON_PAGE = 12;
const AVAILABLE_PAGES = 3;

const GoodsList: React.FC<IGoodsListProps> = ({ goods, categories }) => {
  const [sortSelect, setSortSelect] = useState<keyof typeof SORT_TRANSLATE>(
    'default'
  );
  const router = useRouter();
  const { locale, query } = router;

  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState<Array<number>>([]);
  const [firstGoodsOnPageIndex, setFirstGoodsOnPageIndex] = useState(1);

  const filteredGoods = goods?.entries.filter(
    ({ categories }) =>
      selectedCategories.length == 0 ||
      (Array.isArray(categories) &&
        categories.reduce<boolean>(
          (prev, { _id }) => selectedCategories.includes(_id) || prev,
          false
        ))
  );

  const sortedGoods = SORT_GOODS[sortSelect](
    filteredGoods as ICockpitGoodsRaw[]
  );

  const maxPageNumber = Math.ceil(sortedGoods?.length / GOODS_ON_PAGE);

  useEffect(() => {
    setFirstGoodsOnPageIndex((currentPage - 1) * GOODS_ON_PAGE);
    if (maxPageNumber <= 1) setVisiblePages([]);
    else if (currentPage + 1 + AVAILABLE_PAGES >= maxPageNumber)
      setVisiblePages(
        [...Array(maxPageNumber + 1).keys()].splice(
          maxPageNumber > AVAILABLE_PAGES ? maxPageNumber - AVAILABLE_PAGES : 1,
          maxPageNumber
        )
      );
    else if (currentPage + 1 - AVAILABLE_PAGES <= 0)
      setVisiblePages(
        [...Array(maxPageNumber + 1).keys()].splice(1, AVAILABLE_PAGES)
      );
    else
      setVisiblePages(
        [...Array(maxPageNumber + 1).keys()].splice(
          currentPage - Math.floor(AVAILABLE_PAGES / 2),
          currentPage + Math.ceil(AVAILABLE_PAGES / 2) - 1
        )
      );
  }, [currentPage, maxPageNumber]);

  useEffect(() => {
    const page = query.page ? Number.parseInt(query.page as string) : 0;
    setCurrentPage(page && page < maxPageNumber + 1 ? page : 1);
  }, [query.page, maxPageNumber]);

  useEffect(() => {
    if (selectedCategories.length) {
      setCurrentPage(1);
      const newQuery = router.query;
      newQuery['page'] = '1';
      router.push({ pathname: router.pathname, query: newQuery });
    }
  }, [selectedCategories]);

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

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div
          role="presentation"
          className="dropdown"
          onClick={() => setCategoriesOpen((prev) => !prev)}
        >
          <div className="dropdown__value">
            {TRANSLATE[locale as 'ru' | 'en'].goodsCaterories}
            <div className="dropdown-button" />
          </div>
          <div
            className={`dropdown__list goods-list-categories__list ${
              isCategoriesOpen ? 'open' : ''
            }`}
          >
            {categories.map(({ _id, title }) => (
              <div
                key={_id}
                className="goods-list-categories__list-item"
                role="presentation"
                onClick={() => {
                  setSelectedCategories((prev) =>
                    prev.includes(_id)
                      ? prev.filter((id) => id != _id)
                      : [...prev, _id]
                  );
                }}
              >
                <div className="goods-list-categories__list-item-label">
                  <div
                    className={`goods-list-categories__list-item-label-box ${
                      selectedCategories.includes(_id)
                        ? 'goods-list-categories__list-item-label-box-selected'
                        : ''
                    }`}
                  >
                    <SuccessSVG />
                  </div>

                  {title}
                </div>
              </div>
            ))}
          </div>
        </div>
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
      <div className="goods-list__categories">
        {categories
          .filter(({ _id }) => selectedCategories.includes(_id))
          .map(({ _id, title }) => (
            <div
              role="presentation"
              key={_id}
              className="goods-list__categories-title"
              onClick={() =>
                setSelectedCategories((prev) => prev.filter((id) => id != _id))
              }
            >
              {title}
              <CrossSVG />
            </div>
          ))}
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
                secondPhoto={secondImage?.path || undefined}
                price={price}
                stockPrice={stockPrice}
              />
            )
          )}
      </div>
      <div className="goods-list__pages-buttons">
        {currentPage > 1 && (
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
              {pageNum}
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
