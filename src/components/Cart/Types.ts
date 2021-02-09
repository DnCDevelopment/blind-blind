import { FormikValues } from 'formik';

export interface ICartGoodsItemDetailsProps {
  details: string | FormikValues;
}

export interface ICartGoodsItemProps extends ICartGoodsItemDetailsProps {
  id: string;
  title: string;
  link: string;
  photo: string;
  price: string;
  amount: number;
  removeSelf?: () => void;
}
