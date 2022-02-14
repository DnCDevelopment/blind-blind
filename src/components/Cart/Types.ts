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
  collectionTitle: string;
  removeSelf?: () => void;
}

export interface ICartVoucherItemProps extends ICartGoodsItemProps {
  receiverName: string;
  receiverEmail: string;
  yourName: string;
  yourEmail: string;
  message?: string;
  removeSelf?: () => void;
}
