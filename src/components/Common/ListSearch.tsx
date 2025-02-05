import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input } from 'antd';
import { QuestionPageTitle } from '../../styles/QuestionPage/QuestionPage.styles';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { QUESTIONNAIRE_TITLE } from '../../constants';

const ListSearch = () => {
  const { Search } = Input;
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const questionnaireTitle = searchParams.get(QUESTIONNAIRE_TITLE);
    setSearchValue(questionnaireTitle || '');
  }, [searchParams]);

  const handleSearch = (value: string) => {
    console.log(value);
    navigate({
      pathname,
      search: `?${QUESTIONNAIRE_TITLE}=${value}`,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event', event?.target.value);
    setSearchValue(event?.target.value || '');
  };

  return (
    <QuestionPageTitle>
      <div className="question-page-title-right">
        <Search
          placeholder="请输入问卷标题"
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
