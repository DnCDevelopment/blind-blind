export interface IGoodsItemProps {
  title: string;
  link: string;
  photo: string;
  secondPhoto: string;
  price: string;
  stockPrice: string | null;
}

export interface IGoodsListProps {
  filter?: string;
}

export interface IGoodsListTitleProps {
  title?: string;
}
