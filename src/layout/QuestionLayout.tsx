import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavPage } from '../hooks/useNavPage';

const QuestionLayout = () => {
  useNavPage();
  return (
    <div style={{ height: '100vh' }}>
      <Outlet />
    </div>
  );
};

export default QuestionLayout;
