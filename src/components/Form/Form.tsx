import { useFormik } from 'formik';

import { IFormProps } from './Types';

const Form: React.FC<IFormProps> = ({
  formikConfig,
  placeholders,
  suffixes,
}) => {
  const formik = useFormik(formikConfig);

  return (
    <form action="">
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
            {suffixes[key] && <span className="input-suffix">cm</span>}
          </div>
          {formik.errors[key] && formik.touched[key] && (
            <p className="error">{formik.errors[key]}</p>
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
