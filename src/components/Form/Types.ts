import { FormikConfig, FormikValues } from 'formik';

export interface IFormProps {
  formikConfig: FormikConfig<FormikValues>;
  placeholders: { [key: string]: string };
  masks: { [key: string]: string[] };
}
