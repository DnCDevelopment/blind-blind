import { FocusEventHandler, useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';
import Fuse from 'fuse.js';

import Button from '../Button/Button';
import Dropdown from './Dropdown';

import { IFormProps } from './Types';

import { FORM } from '../../constants/form';

import warehouses from '../../../npWarehouses.json';

const Form: React.FC<IFormProps> = ({
  formikConfig,
  types,
  selectOptions,
  placeholders,
  suffixes,
  masks,
  checkboxText,
  buttonTitle,
  optionFields,
}) => {
  const formik = useFormik(formikConfig);
  const { locale } = useRouter();

  useEffect(() => {
    formik.setValues(formikConfig.initialValues);
  }, [formikConfig]);

  const inputWarehouse = useMemo(() => {
    const options = {
      includeScore: true,
      keys: ['settlement'],
    };
    const fuse = new Fuse(warehouses, options);
    const currentWarehouses = fuse.search(formik.values['city'] || '');
    if (locale === 'en' || !currentWarehouses.length) {
      const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        e.target.value = e.target.value.trim();
        formik.handleBlur(e);
        formik.handleChange(e);
      };

      const InputText = (key: string) => (
        <div className="input-box">
          <input
            type="text"
            id={key}
            name={key}
            value={formik.values[key]}
            placeholder={placeholders[key]}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            onFocus={() => (formik.touched[key] = undefined)}
          />
          {!!suffixes && suffixes[key] && (
            <span className="input-suffix">{suffixes[key]}</span>
          )}
        </div>
      );
      return InputText;
    }
    const InputField = (key: string) => (
      <div className="input-select">
        <Dropdown
          value={formik.values[key]}
          placeholder={placeholders[key]}
          values={currentWarehouses.map(({ item: { address } }) => address)}
          setValue={(item) => formik.setFieldValue(key, item)}
        />
      </div>
    );
    return InputField;
  }, [formik, placeholders, locale]);

  const inputText = useMemo(() => {
    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      e.target.value = e.target.value.trim();
      formik.handleBlur(e);
      formik.handleChange(e);
    };

    const InputField = (key: string) => (
      <div className="input-box">
        <input
          type="text"
          id={key}
          name={key}
          value={formik.values[key]}
          placeholder={placeholders[key]}
          onChange={formik.handleChange}
          onBlur={handleBlur}
          onFocus={() => (formik.touched[key] = undefined)}
        />
        {!!suffixes && suffixes[key] && (
          <span className="input-suffix">{suffixes[key]}</span>
        )}
      </div>
    );
    return InputField;
  }, [formik, placeholders, suffixes]);

  const inputTextWithMask = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-box">
        <InputMask
          type="text"
          id={key}
          name={key}
          value={formik.values[key]}
          placeholder={placeholders[key]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={() => (formik.touched[key] = undefined)}
          mask={masks ? masks[key] : ''}
        />
        {!!suffixes && suffixes[key] && (
          <span className="input-suffix">{suffixes[key]}</span>
        )}
      </div>
    );
    return InputField;
  }, [formik, masks, placeholders, suffixes]);

  const inputTextArea = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-area">
        <textarea
          id={key}
          name={key}
          value={formik.values[key]}
          placeholder={placeholders[key]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={() => (formik.touched[key] = undefined)}
        />
        {!!suffixes && suffixes[key] && (
          <span className="input-suffix">{suffixes[key]}</span>
        )}
      </div>
    );
    return InputField;
  }, [formik, placeholders, suffixes]);

  const inputCheckbox = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-checkbox">
        <input
          className="checkbox"
          type="checkbox"
          id={key}
          name={key}
          value={formik.values[key]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={() => (formik.touched[key] = undefined)}
        />
        <label className="input-checkbox__label" htmlFor={key}>
          {checkboxText}
        </label>
      </div>
    );
    return InputField;
  }, [formik, checkboxText]);

  const inputDelivery = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-select">
        <Dropdown
          value={formik.values[key]}
          placeholder={placeholders[key]}
          values={[
            FORM[locale as 'ru' | 'en'].novaPoshta,
            FORM[locale as 'ru' | 'en'].ukrPoshta,
            FORM[locale as 'ru' | 'en'].courierNovaPoshta,
          ]}
          setValue={(item) => formik.setFieldValue(key, item)}
        />
      </div>
    );
    return InputField;
  }, [formik, placeholders, selectOptions]);

  const inputSelect = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-select">
        <Dropdown
          value={formik.values[key]}
          placeholder={placeholders[key]}
          values={selectOptions ? selectOptions[key] : []}
          setValue={(item) => formik.setFieldValue(key, item)}
        />
      </div>
    );
    return InputField;
  }, [formik, placeholders, selectOptions]);

  const inputPhone = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-box">
        <input
          type="text"
          id={key}
          name={key}
          value={formik.values[key]}
          placeholder={placeholders[key]}
          onChange={(e) => {
            if (e.target.value.length < 1) {
              e.target.value = formik.values[key] = '+';
            }
            formik.handleChange(e);
          }}
          onBlur={(e) => {
            if (e.target.value.trim() === '+') {
              e.target.value = formik.values[key] = '';
            }
            formik.handleBlur(e);
          }}
          onFocus={(e) => {
            formik.touched[key] = undefined;
            if (!formik.values[key].startsWith('+')) {
              e.target.value = `+${formik.values[key]}`;
            }
          }}
        />
        {!!suffixes && suffixes[key] && (
          <span className="input-suffix">{suffixes[key]}</span>
        )}
      </div>
    );
    return InputField;
  }, [formik, placeholders, suffixes]);

  const renderField = (key: string, idx: number) => {
    return (
      <div key={idx} className="form-row">
        {types[key] !== 'text' || !masks || (masks && !masks[key])
          ? InputTypes[types[key]](key)
          : InputTypes.maskedText(key)}
        {formik.errors[key] && formik.touched[key] && (
          <p className="error">{formik.errors[key]}</p>
        )}
      </div>
    );
  };

  const InputTypes: { [key: string]: (key: string) => void } = {
    text: inputText,
    select: inputSelect,
    checkbox: inputCheckbox,
    phone: inputPhone,
    maskedText: inputTextWithMask,
    textArea: inputTextArea,
    warehouse: inputWarehouse,
    delivery: inputDelivery,
  };

  const findOptionField = (key: string) =>
    optionFields?.find(({ fieldName }) => key === fieldName);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {Object.keys(formik.values).map((key, idx) => {
        const optionField = findOptionField(key);
        if (
          optionField?.dependFieldValue ===
            formik.values[optionField?.dependFieldName as string] ||
          !optionField
        ) {
          return renderField(key, idx);
        }
      })}
      <div className="button-container">
        <Button
          title={buttonTitle}
          callback={() => formik.handleSubmit()}
          type="button"
        />
      </div>
    </form>
  );
};

export default Form;
