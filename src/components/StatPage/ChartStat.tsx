import React, { useEffect, useState } from 'react';
import { Typography, Empty, Space } from 'antd';
import PieChartComponent from './PieChart';
import BarChartComponent from './BarChart';
import { componentStatType } from '../../types/Stat/answer_list';
import { getComponentStat } from '../../services/answer';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { getComponentConfigByType } from '../QuestionComponents/config';

const ChartStat = (props: { componentId: string; componentType: string }) => {
  const { Title } = Typography;
  const { id } = useParams();
  const { componentId, componentType } = props;

  const [data, setData] = useState<componentStatType[]>([]);
  const componentConfig = getComponentConfigByType(componentType);
  const { statComponent: StatComponent } = componentConfig || {};

  const { run: getComponentStatData } = useRequest(() => getComponentStat(id || '', componentId), {
    manual: true,
    onSuccess: res => {
      setData(res);
    },
  });

  useEffect(() => {
    if (id && componentId) {
      getComponentStatData();
    }
  }, [componentId, id]);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={32}>
      <Title style={{ fontSize: 24, marginBottom: 0 }}>图表统计</Title>
      {StatComponent ? (
        data.length > 0 ? (
          <StatComponent data={data} />
        ) : (
          <Empty description="暂无统计数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      ) : (
        <Empty description="数据类型不支持统计" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Space>
  );
};

export default ChartStat;
