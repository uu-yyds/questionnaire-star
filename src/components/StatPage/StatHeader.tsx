import React, { useRef } from 'react';
import { StatHeaderWrapper, StatHeaderContent } from '../../styles/StatPage/StatHeader.styles';
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover } from 'antd';
import { ArrowLeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPageInfo } from '../../hooks/useGetPageInfo';
import { QUESTION_EDIT_PATHNAME } from '../../constants';
import { GEN_TOC_URL } from '../../constants/gen_toc_url';
import { QRCodeSVG } from 'qrcode.react';

const { Title } = Typography;

const StatHeader = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();

  const GenLinkAndQRCodeElement = () => {
    if (!isPublished) return null;

    const url = `${GEN_TOC_URL}${id}`;
    const urlInputRef = useRef<InputRef>(null);

    const copy = (text: string) => {
      const elem = urlInputRef.current;
      if (!elem) return;
      elem.select();
      document.execCommand('copy');
      message.success('复制成功');
    };

    const QRCodeElement = (
      <div style={{ textAlign: 'center' }}>
        <QRCodeSVG value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: 300 }} ref={urlInputRef} />
        <Tooltip title="复制链接">
          <Button icon={<CopyOutlined />} onClick={() => copy(url)} />
        </Tooltip>
        <Popover content={QRCodeElement}>
          <Button type="primary" icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  };

  return (
    <StatHeaderWrapper>
      <StatHeaderContent>
        <div className="left">
          <Space>
            <Button type="link" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
              返回
            </Button>
            <Title style={{ fontSize: 16, marginBottom: 0 }}>{title}</Title>
          </Space>
        </div>
        <div className="main">{GenLinkAndQRCodeElement()}</div>
        <div className="right">
          <Button type="primary" onClick={() => navigate(`${QUESTION_EDIT_PATHNAME}/${id}`)}>
            编辑
          </Button>
        </div>
      </StatHeaderContent>
    </StatHeaderWrapper>
  );
};

export default StatHeader;
