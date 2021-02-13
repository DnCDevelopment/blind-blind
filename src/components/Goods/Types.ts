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
  secondPhoto: string;
}

export interface IGoodsSearchItemProps {
  title: string;
  link: string;
  photo: string;
  price: string;
}

export interface IGoodsListProps {
  filter?: string;
}

export interface IGoodsListTitleProps {
  title?: string;
}

export interface IGoodsSingleProps extends IGoodsItemProps {
  id: string;
  otherPhotos: string | { path: string }[];
  sizes: string[];
  materials: string[];
  description: string;
  isExclusive: boolean;
  collectionLink: string;
}

export interface IFormValues {
  growth: string;
  bust: string;
  waist: string;
  hips: string;
}
