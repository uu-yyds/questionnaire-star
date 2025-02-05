import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MANAGE_PATHNAME } from '../../constants';
import { HomePageWrapper } from '../../styles/HomePage';

const Home = () => {
  const navigate = useNavigate();
  const { Title, Paragraph } = Typography;
  return (
    <HomePageWrapper>
      <div>
        <Title>问卷调查 ｜ 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
      </div>
      <div className="info">
        <Button type="primary" size="large" onClick={() => navigate(MANAGE_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </HomePageWrapper>
  );
};

export default Home;
