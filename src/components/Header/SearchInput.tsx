import { useRouter } from 'next/router';

import { TRANSLATE } from '../../constants/languages';

const SearchInput: React.FC = () => {
  const { locale } = useRouter();

  return (
    <input
      type="text"
      className="search-input"
      placeholder={TRANSLATE[locale as 'ru' | 'en'].search}
    />
  );
};

export default SearchInput;
