import { ICockpitGoodsRaw } from '../cockpitTypes';

const currentPrice = (good: ICockpitGoodsRaw) =>
  good.stockPrice ? +good.stockPrice : +good.price;

export const SORT_GOODS = {
  nameAbs: (goods: ICockpitGoodsRaw[]) => {
    return Array(...goods).sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }

      if (a.title > b.title) {
        return 1;
      }

      return 0;
    });
  },
  nameDesc: (goods: ICockpitGoodsRaw[]) => {
    return Array(...goods).sort((a, b) => {
      if (a.title < b.title) {
        return 1;
      }

      if (a.title > b.title) {
        return -1;
      }

      return 0;
    });
  },
  priceAbs: (goods: ICockpitGoodsRaw[]) => {
    return Array(...goods).sort((a, b) => currentPrice(a) - currentPrice(b));
  },
  priceDesc: (goods: ICockpitGoodsRaw[]) => {
    return Array(...goods).sort((a, b) => currentPrice(b) - currentPrice(a));
  },
  default: (goods: ICockpitGoodsRaw[]) => goods,
};

export const SORT_TRANSLATE = {
  default: {
    ru: 'За замовчуванням',
    en: 'Default',
  },
  nameAbs: {
    ru: 'Найменування А -> Я',
    en: 'Name A -> Z',
  },
  nameDesc: {
    ru: 'Найменування Я -> А',
    en: 'Name Z -> A',
  },
  priceAbs: {
    ru: 'Ціна (за зростанням)',
    en: 'Price Low -> High',
  },
  priceDesc: {
    ru: 'Ціна (за зменшенням)',
    en: 'Price High -> Low',
  },
};
