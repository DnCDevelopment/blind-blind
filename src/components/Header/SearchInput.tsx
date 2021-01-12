import { useContext } from 'react';

import context from '../../context/context';

import { IContext } from '../../context/Types';

import { TRANSLATE } from '../../constants/languages';

const SearchInput: React.FC = () => {
  const { language } = useContext(context) as IContext;

  return (
    <input
      type="text"
      className="search-input"
      placeholder={TRANSLATE[language as 'ru' | 'en'].search}
    />
  );
};

export default SearchInput;
