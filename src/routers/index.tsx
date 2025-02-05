import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import ManageLayout from '../layout/ManageLayout';
import QuestionLayout from '../layout/QuestionLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import QuestionPage from '../pages/QuestionPage';
import StarPage from '../pages/StarPage';
import TrashPage from '../pages/TrashPage';
import NotFound from '../pages/NotFound';
import EditPage from '../pages/EditPage';
import StatPage from '../pages/StatPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/manage',
        element: <ManageLayout />,
        children: [
          {
            path: '/manage/star',
            element: <StarPage />,
          },
          {
            path: '/manage/trash',
            element: <TrashPage />,
          },
          {
            path: '/manage/list',
            element: <QuestionPage />,
          },
          {
            path: '/manage/',
            element: <QuestionPage />,
          },
        ],
      },
      {
        path: '/question',
        element: <QuestionLayout />,
        children: [
          {
            path: 'edit/:id',
            element: <EditPage />,
          },
          {
            path: 'stat/:id',
            element: <StatPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
