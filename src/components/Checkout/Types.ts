import { FormikValues } from 'formik';

export interface IOrderSummaryListItemProps {
  price: string;
  amount: number;
  title?: string;
  details?: string | FormikValues;
  photo?: string;
  receiverName?: string;
}

type deliveryChangeHandler = (deliveryMethod: string) => void;

export interface IShippingProps {
  deliveryCost: number;
  setCost: deliveryChangeHandler;
}
export interface IShippingMainFormProps {
  confirmCheckout: (values: FormikValues) => void;
  deliveryChangeHandler: deliveryChangeHandler;
}

export interface IOrderSummaryListProps {
  currencyTotalCheckout: string;
  checkDiscountCode: (enteredCode: string) => void;
}
