import { useFormik } from 'formik';
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {Object.keys(formik.values).map((key, idx) => (
        <div key={idx} className="form-row">
          {types[key] === 'checkbox' ? (
            <div className="input-checkbox">
              <input
                className="checkbox"
                type={types[key]}
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
          ) : types[key] === 'select' ? (
            <div className="input-select">
              <Dropdown
                value={formik.values[key]}
                placeholder={placeholders[key]}
                values={selectOptions ? selectOptions[key] : []}
                setValue={(item) => formik.setFieldValue(key, item)}
              />
            </div>
          ) : (
            <div className="input-box">
              {masks && masks[key] ? (
                <InputMask
                  type={types[key]}
                  id={key}
                  name={key}
                  value={formik.values[key]}
                  placeholder={placeholders[key]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={() => (formik.touched[key] = undefined)}
                  mask={masks[key]}
                />
              ) : (
                <input
                  type={types[key]}
                  id={key}
                  name={key}
                  value={formik.values[key]}
                  placeholder={placeholders[key]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onFocus={() => (formik.touched[key] = undefined)}
                />
              )}
              {!!suffixes && suffixes[key] && (
                <span className="input-suffix">{suffixes[key]}</span>
              )}
            </div>
          )}
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
