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

export interface ICartVoucherItemProps {
  id?: string;
  receiverName: string;
  receiverEmail: string;
  yourName: string;
  yourEmail: string;
  message?: string;
  amount: number;
  price: string;
  theme: string;
  removeSelf?: () => void;
}
