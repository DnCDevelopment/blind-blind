import { ICockpitGoodsEntries, ICockpitGoodCategory } from '../../cockpitTypes';

export interface IPriceLabelProps {
  price: string;
  stockPrice: string | null;
}

export interface ISizeDropdownProps {
  curSize: string;
  sizes: string[];
  changeCurSize: (size: string) => void;
}

export interface IGoodsItemProps extends IPriceLabelProps {
  title: string;
  link?: string;
  photo: string;
  secondPhoto?: string;
  isOutOfStock?: boolean;
}

export interface IGoodsSearchItemProps {
  title: string;
  link: string;
  photo: string;
  price: string;
}

export interface IGoodsListProps {
  goods: ICockpitGoodsEntries;
  categories: ICockpitGoodCategory[];
}

export interface IGoodsListTitleProps {
  title?: string;
}

export interface IGoodsSingleProps extends IGoodsItemProps {
  id: string;
  otherPhotos: string | { path: string }[];
  sizes: {
    value: string;
    forOrder: boolean;
  }[];
  materials: string[];
  description: string;
  isExclusive: boolean;
  collectionLink: string;
  collectionTitle: string;
}

export interface IFormValues {
  growth: string;
  bust: string;
  waist: string;
  hips: string;
}

export interface IZoomImageProps {
  image: string;
  alt: string;
  zoom: number;
}
