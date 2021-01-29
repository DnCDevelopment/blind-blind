import { useFormik } from 'formik';
import Button from '../Button/Button';

import { IFormProps } from './Types';

const Form: React.FC<IFormProps> = ({
  formikConfig,
  placeholders,
  suffixes,
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
            {suffixes[key] && (
              <span className="input-suffix">{suffixes[key]}</span>
            )}
          </div>
          {formik.errors[key] && formik.touched[key] && (
            <p className="error">{formik.errors[key]}</p>
          )}
        </div>
      ))}
      <Button
        title={buttonTitle}
        callback={formik.handleSubmit}
        type="button"
      />
    </form>
  );
};

export default Form;
