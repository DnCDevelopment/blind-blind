import { FormikValues } from 'formik';

export interface ICartGoodsItemProps {
  id: string;
  title: string;
  link: string;
  photo: string;
  price: string;
  details: string | FormikValues;
  amount: number;
  removeSelf?: () => void;
}
