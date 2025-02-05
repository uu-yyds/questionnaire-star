import React from 'react';
import { Outlet } from 'react-router-dom';

const QuestionLayout = () => {
  return (
    <>
      <div>QuestionLayoutHeader</div>
      <Outlet />
    </>
  );
};

export default QuestionLayout;
