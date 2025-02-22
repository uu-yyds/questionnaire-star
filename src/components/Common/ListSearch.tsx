import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input } from 'antd';
import { QuestionPageTitle } from '../../styles/QuestionPage/QuestionPage.styles';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../../constants';

const ListSearch = () => {
  const { Search } = Input;
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY);
    setSearchValue(keyword || '');
  }, [searchParams]);

  const handleSearch = (value: string) => {
    navigate({
      pathname,
      search: `?${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target.value || '');
  };

  return (
    <QuestionPageTitle>
      <div className="question-page-title-right">
        <Search
          placeholder="请输入关键字"
          size="large"
          allowClear
          onSearch={handleSearch}
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </QuestionPageTitle>
  );
};

export default ListSearch;
