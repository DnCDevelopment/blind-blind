import { FormikValues } from 'formik';

export interface IOrderSummaryListItemProps {
  price: string;
  amount: number;
  title?: string;
  details?: string | FormikValues;
  photo?: string;
  receiverName?: string;
}
