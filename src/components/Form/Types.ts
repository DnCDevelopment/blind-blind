import { FormikConfig, FormikValues } from 'formik';

export interface IFormProps {
  formikConfig: FormikConfig<FormikValues>;
  types: { [key: string]: string };
  placeholders: { [key: string]: string };
  selectOptions?: { [key: string]: string[] };
  suffixes?: { [key: string]: string };
  masks?: { [key: string]: string };
  checkboxText?: string;
  buttonTitle: string;
  optionField?: {
    dependFieldName: string;
    dependFieldValue: string;
    fieldName: string;
  };
}

export interface IDropdownProps {
  value: string;
  placeholder?: string;
  values: string[];
  setValue: (item: string) => void;
}
