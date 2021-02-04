import React, { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Alert,
  Typography,
  Table,
  Space,
  Tag,
  Layout,
  Button,
  Row,
  Col,
  Modal,
  message,
  Input,
  Form,
} from 'antd';
import { connect } from 'umi';
import ProCard from '@ant-design/pro-card';
import {} from '@ant-design/icons';

const { Content } = Layout;
const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const MaterialSearch = (props) => {
  return <PageContainer>MaterialSearch</PageContainer>;
};
export default connect(({ materialEnter, loading }) => ({ ...materialEnter, loading }))(
  MaterialSearch,
);
