import React from 'react';
import { Outlet } from 'react-router-dom';
import { ManagePageWrapper } from '../styles/Layout';

const ManageLayout = () => {
  return (
    <ManagePageWrapper>
      <div>ManageLayoutLeft</div>
      <Outlet />
    </ManagePageWrapper>
  );
};

export default ManageLayout;
