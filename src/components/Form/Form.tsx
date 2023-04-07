import { FocusEventHandler, useMemo, useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';
import intlTelInput from 'intl-tel-input';
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
  deliveryChangeHandler,
}) => {
  const formik = useFormik(formikConfig);
  const { locale } = useRouter();
  const phoneRef = useRef<HTMLInputElement>(null);
  const [mask, setMask] = useState<intlTelInput.Plugin>();

  useEffect(() => {
    if (formik.values.phone !== undefined) {
      setMask(
        intlTelInput(phoneRef.current!, {
          separateDialCode: true,
          initialCountry: 'ua',
          preferredCountries: ['ua', 'ru', 'kz', 'us', 'il', 'ae', 'by'],
          excludeCountries: ['ru', 'by']
        })
      );
    }
  }, [phoneRef]);
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
    function deliverySetValue(item: string, key: string) {
      formik.setFieldValue(key, item);
      if (deliveryChangeHandler) deliveryChangeHandler(item);
    }
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
          setValue={(item) => deliverySetValue(item, key)}
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
        <div className="phone-mask-container">
          <input
            type="text"
            id={key}
            name={key}
            ref={phoneRef}
            value={formik.values[key]}
            placeholder={placeholders[key]}
            onChange={(e) => {
              if (
                (e.target.value.length < 11 && e.target.value.match(/^\d+$/)) ||
                (e.target.value.match(/[+]\d+$/) && e.target.value.length < 15)
              ) {
                formik.handleChange(e);
              }
            }}
          />
        </div>
        {!!suffixes && suffixes[key] && (
          <span className="input-suffix">{suffixes[key]}</span>
        )}
      </div>
    );
    return InputField;
  }, [formik, placeholders, suffixes]);

  const inputDate = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-date">
        <input
          type="text"
          id={key}
          name={key}
          value={formik.values[key]}
          placeholder={placeholders[key]}
          onChange={formik.handleChange}
          onFocus={(e) => {
            e.currentTarget.type = 'date';
          }}
          onBlur={(e) => {
            e.currentTarget.type = 'text';
          }}
        />
      </div>
    );
    return InputField;
  }, [formik, placeholders, selectOptions]);

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
    date: inputDate,
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
      <div className={'button-container'}>
        <Button
          title={buttonTitle}
          callback={() => {
            if (formik.values.phone === undefined) return formik.handleSubmit();
            if (
              formik.values.phone.length > 8 &&
              formik.values.phone.length < 11
            ) {
              formik.values.phone = `+${
                mask!.getSelectedCountryData().dialCode
              }${formik.values.phone}`;
            }
            if (formik.values.phone.length < 15) formik.handleSubmit();
          }}
          type="button"
        />
      </div>
    </form>
  );
};

export default Form;
