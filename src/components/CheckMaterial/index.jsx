import { SearchOutlined } from '@ant-design/icons';
import { Space, Table, Modal, Descriptions, Badge, Image, Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useRequest } from 'umi';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const CheckMaterial = (props) => {
  const { dispatch, visible, onCancel, data } = props;
  const [literVisible, setLiterVisible] = useState(false);
  const [caseVisible, setCaseVisible] = useState(false);
  const [editorState, setEeditorState] = useState(BraftEditor.createEditorState(null));

  const openLiter = () => {
    // const LiterIds = data.LiterIds || []
    // const data = useRequest(() => {
    //   return services.getUserList('/api/test');
    // });
    console.log(useRequest);
    // dispatch({
    //   type: 'materialManager/getLiterInfo',
    //   params: { literIds: LiterIds },
    // }).then((res) => {
    //   if (res.State) {
    //     setLiterVisible(true);

    //   }
    // });
  };

  // 应用实例
  const openCase = () => {
    const htmlString = data.Examples || null;
    setEeditorState(BraftEditor.createEditorState(htmlString));
    setCaseVisible(true);
  };

  // 文献弹框表格
  const literColumns = [
    { dataIndex: 'LiterName', title: '文献名称', align: 'center' },
    { dataIndex: 'LiterYear', title: '文献年份', align: 'center', width: 120 },
    { dataIndex: 'LiterCode', title: '文献DOI号', align: 'center', width: 150 },
    { dataIndex: 'Remark', title: '备注', align: 'center', width: 200 },
  ];

  console.log(data);
  return (
    <Modal
      visible={visible}
      centered
      forceRender
      width={760}
      title={'查看材料'}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      footer={null}
      // onOk={() => {
      //   form.validateFields().then((values) => {
      //     onCreate(values);
      //   });
      // }}
    >
      <Descriptions
        title={
          <div style={{ textAlign: 'center' }}>
            <div>CAS号</div>
            <div>CAS号</div>
          </div>
        }
        bordered
        column={2}
        labelStyle={{ width: 120, textAlign: 'right' }}
        extra={
          <Space direction="vertical">
            <Button onClick={openLiter}>相关文献</Button>
            <Button onClick={openCase}>应用实例</Button>
          </Space>
        }
      >
        <Descriptions.Item label="常用名">{data.MaterialName}</Descriptions.Item>
        <Descriptions.Item label="英文名">{data.MaterialEName}</Descriptions.Item>
        <Descriptions.Item label="CAS号">{data.MaterialRecordCode}</Descriptions.Item>
        <Descriptions.Item label="分子量">{data.MolecularWeight}</Descriptions.Item>
        <Descriptions.Item label="密度">{data.Density}</Descriptions.Item>
        <Descriptions.Item label="沸点">{data.BoilingPoint}℃</Descriptions.Item>
        <Descriptions.Item label="分子式">{data.ChemicalFormula}</Descriptions.Item>
        <Descriptions.Item label="熔点">{data.MeltingPoint}℃</Descriptions.Item>
        <Descriptions.Item label="MSDN">
          {data.MSDSEdition === 1 ? '中文版' : '美版'}
        </Descriptions.Item>
        <Descriptions.Item label="闪点">{data.FlashPoint}℃</Descriptions.Item>
        <Descriptions.Item label="符号" contentStyle={{ width: 180 }}>
          <Image src={data.Symbol} style={{ width: 180 }} />
        </Descriptions.Item>
        <Descriptions.Item label="信号词">{data.SignalWords}</Descriptions.Item>
        <Descriptions.Item label="自愈方式">{data.SceneName}</Descriptions.Item>
        <Descriptions.Item label="应用方向">{data.SceneName}</Descriptions.Item>
      </Descriptions>

      {/* 相关文献 */}
      <Modal
        // confirmLoading={loading && loading.models.materialManager}
        visible={literVisible}
        centered
        width={1200}
        height={500}
        okText="确定"
        cancelText="取消"
        title={'相关文献'}
        // onOk={literOk}
        onCancel={() => setLiterVisible(false)}
      >
        <Table
          columns={literColumns}
          dataSource={props.literData}
          rowKey="LiterId"
          pagination={false}
        />
      </Modal>

      {/* 应用实例 */}
      <Modal
        // confirmLoading={loading && loading.models.materialManager}
        visible={caseVisible}
        centered
        width={1200}
        okText="确定"
        cancelText="取消"
        title={'应用实例'}
        // onOk={caseOk}
        onCancel={() => setCaseVisible(false)}
      >
        <BraftEditor
          controlBarClassName={'editorNoStyle'}
          readOnly={true}
          value={editorState}
          // onChange={handleEditorChange}
          // onSave={submitContent}
        />
      </Modal>
    </Modal>
  );
};

export default CheckMaterial;
