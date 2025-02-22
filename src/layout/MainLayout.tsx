import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayoutWrapper } from '../styles/Layout';
import { Layout } from 'antd';
import Logo from '../components/MainLayout/Logo';
import UserInfo from '../components/MainLayout/UserInfo';
import { useNavPage } from '../hooks/useNavPage';

const MainLayout = () => {
  useNavPage();
  const { Header, Footer, Content } = Layout;
  return (
    <MainLayoutWrapper>
      <Layout>
        <Header className="header">
          <div className="left">
            <Logo />
          </div>
          <div className="right">
            <UserInfo />
          </div>
        </Header>
        <Content className="main">
          <Outlet />
        </Content>
        <Footer className="footer">小鱼问卷 &copy; 2024 - present. Created by 小鱼</Footer>
      </Layout>
    </MainLayoutWrapper>
  );
};

export default MainLayout;
