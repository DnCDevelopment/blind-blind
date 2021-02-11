import { useFormik } from 'formik';
import { useMemo } from 'react';
import InputMask from 'react-input-mask';

import Button from '../Button/Button';
import Dropdown from './Dropdown';

import { IFormProps } from './Types';

const Form: React.FC<IFormProps> = ({
  formikConfig,
  types,
  selectOptions,
  placeholders,
  suffixes,
  masks,
  checkboxText,
  buttonTitle,
}) => {
  const formik = useFormik(formikConfig);

  const inputText = useMemo(() => {
    const InputField = (key: string) => (
      <div className="input-box">
        <input
          type="text"
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

  const InputTypes: { [key: string]: (key: string) => void } = {
    text: inputText,
    select: inputSelect,
    checkbox: inputCheckbox,
    maskedText: inputTextWithMask,
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {Object.keys(formik.values).map((key, idx) => (
        <div key={idx} className="form-row">
          {types[key] !== 'text' || !masks || (masks && !masks[key])
            ? InputTypes[types[key]](key)
            : InputTypes.maskedText(key)}
          {formik.errors[key] && formik.touched[key] && (
            <p className="error">{formik.errors[key]}</p>
          )}
        </div>
      ))}
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
