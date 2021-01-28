import { useFormik } from 'formik';
import { SyntheticEvent } from 'react';
import { IFormProps } from './Types';

const Form: React.FC<IFormProps> = ({ formikConfig, placeholders, masks }) => {
  const formik = useFormik(formikConfig);

  const handleChange = (e: SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;

    masks[name]?.forEach((part) => {
      if (part !== '_') value.replace(part, '');
    });
    formik.setFieldValue(name, value);

    console.log(formik.values[name]);

    formik.setFieldValue(name, '45');
    console.log(formik.values[name]);
  };

  return (
    <form action="">
      {Object.keys(formik.values).map((key, idx) => (
        <div key={idx} className="form-row">
          <input
            type="text"
            id={key}
            name={key}
            value={formik.values[key]}
            placeholder={placeholders[key]}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => (formik.touched[key] = undefined)}
          />
          {formik.errors[key] && formik.touched[key] && (
            <p>{formik.errors[key]}</p>
          )}
        </div>
      ))}
    </form>
  );
};

export default Form;
