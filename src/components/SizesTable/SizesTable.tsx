import { useRouter } from 'next/router';
import { SIZES_TABLE } from '../../constants/sizesTable';

const SizesTable: React.FC = () => {
  const { locale } = useRouter();

  return (
    <div className="sizes-table narrow-container">
      <h2 className="sizes-table__title">
        {SIZES_TABLE.title[locale as 'ru' | 'en']}
      </h2>
      <table className="sizes-table__table">
        <thead>
          <tr>
            {SIZES_TABLE.head[locale as 'ru' | 'en'].map((el) => (
              <th key={el}>{el}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SIZES_TABLE.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((el, idx) => (
                <td key={idx}>{el}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sizes-table__additional-info">
        {SIZES_TABLE.additional[locale as 'ru' | 'en']}
      </p>
    </div>
  );
};

export default SizesTable;
