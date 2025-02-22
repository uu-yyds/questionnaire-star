import React, { useState, useEffect, useCallback } from 'react';
import { Pagination } from 'antd';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../../constants';

type PaginationProps = {
  total: number;
};

const ListPagination = (props: PaginationProps) => {
  const { total } = props;
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setCurrent(parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '1'));
    setPageSize(parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '10'));
  }, [searchParams]);

  const handleChange = useCallback(
    (page: number, pageSize: number) => {
      setCurrent(page);
      setPageSize(pageSize);
      navigate({
        pathname,
        search: searchParams.toString(),
      });
    },
    [current, pageSize, navigate, pathname, searchParams]
  );

  return <Pagination total={total} current={current} pageSize={pageSize} onChange={handleChange} />;
};

export default ListPagination;
