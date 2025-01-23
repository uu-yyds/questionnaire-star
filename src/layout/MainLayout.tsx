import React from 'react';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
    <>
      <div>MainLayoutHeader</div>
      <Outlet />
      <div>MainLayoutFooter</div>
    </>
  );
};

export default MainLayout;
