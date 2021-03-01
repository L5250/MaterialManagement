import { Space, Table, Modal, Descriptions, Badge, Image, Button } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const CheckMaterial = (props) => {
  const { dispatch, visible, onCancel, dataObj, loading } = props;
  const [literVisible, setLiterVisible] = useState(false);
  const [caseVisible, setCaseVisible] = useState(false);
  const [editorState, setEeditorState] = useState(BraftEditor.createEditorState(null));

  const openLiter = () => {
    const LiterIds = dataObj.LiterIds || '';
    dispatch({
      type: 'materialManager/getLiterInfo',
      params: { literIds: LiterIds },
    }).then((res) => {
      if (res.State) {
        setLiterVisible(true);
      }
    });
  };

  // 应用实例
  const openCase = () => {
    const htmlString = dataObj.Examples || null;
    setEeditorState(BraftEditor.createEditorState(htmlString));
    setCaseVisible(true);
  };

  //
  const changeChemicalFormula = (value = '') => {
    let arr = [];
    if (value) {
      arr = value.split('');
    }
    return arr.map((item, index) => {
      if (!Number.isNaN(Number(item))) {
        return <sub key={index}>{item}</sub>;
      }
      return <span key={index}>{item}</span>;
    });
  };

  // 文献弹框表格
  const literColumns = [
    { dataIndex: 'LiterName', title: '文献名称', align: 'center' },
    { dataIndex: 'LiterYear', title: '文献年份', align: 'center', width: 120 },
    { dataIndex: 'LiterCode', title: '文献DOI号', align: 'center', width: 150 },
    { dataIndex: 'Remark', title: '备注', align: 'center', width: 200 },
  ];

  return (
    <Modal
      visible={visible}
      forceRender
      width={760}
      title={'查看材料'}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      footer={null}
    >
      <Descriptions
        title={
          <div style={{ textAlign: 'center' }}>
            <div>CAS号：{dataObj.MaterialRecordCode}</div>
            <div>{dataObj.MaterialName}</div>
          </div>
        }
        bordered
        column={2}
        labelStyle={{ width: 120, textAlign: 'right' }}
        extra={
          <Space direction="vertical">
            <Button
              type="primary"
              loading={loading && loading.models.materialManager}
              onClick={openLiter}
            >
              相关文献
            </Button>
            <Button type="primary" onClick={openCase}>
              应用实例
            </Button>
          </Space>
        }
      >
        <Descriptions.Item label="常用名">{dataObj.MaterialName}</Descriptions.Item>
        <Descriptions.Item label="英文名">{dataObj.MaterialEName}</Descriptions.Item>
        <Descriptions.Item label="CAS号">{dataObj.MaterialRecordCode}</Descriptions.Item>
        <Descriptions.Item label="分子量">{dataObj.MolecularWeight}</Descriptions.Item>
        <Descriptions.Item label="密度">{dataObj.Density}</Descriptions.Item>
        <Descriptions.Item label="沸点">{dataObj.BoilingPoint}℃</Descriptions.Item>
        <Descriptions.Item label="分子式">
          {changeChemicalFormula(dataObj.ChemicalFormula)}
        </Descriptions.Item>
        <Descriptions.Item label="熔点">{dataObj.MeltingPoint}℃</Descriptions.Item>
        <Descriptions.Item label="MSDN">
          {dataObj.MSDSEdition === 1 ? '中文版' : '美版'}
        </Descriptions.Item>
        <Descriptions.Item label="闪点">{dataObj.FlashPoint}℃</Descriptions.Item>
        <Descriptions.Item label="符号" contentStyle={{ width: 180 }}>
          <Image src={dataObj.Symbol} style={{ width: 180 }} />
        </Descriptions.Item>
        <Descriptions.Item label="信号词">{dataObj.SignalWords}</Descriptions.Item>
        <Descriptions.Item label="自愈类型">{dataObj.TypeName}</Descriptions.Item>
        {/* <Descriptions.Item label="应用方向">{dataObj.SceneName}</Descriptions.Item> */}
      </Descriptions>

      {/* 相关文献 */}
      <Modal
        visible={literVisible}
        centered
        width={1200}
        height={500}
        title={'相关文献'}
        onCancel={() => setLiterVisible(false)}
        footer={null}
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
        visible={caseVisible}
        centered
        width={1200}
        title={'应用实例'}
        onCancel={() => setCaseVisible(false)}
        footer={null}
      >
        <BraftEditor controlBarClassName={'editorNoStyle'} readOnly={true} value={editorState} />
      </Modal>
    </Modal>
  );
};

export default connect(({ materialManager, loading }) => ({ ...materialManager, loading }))(
  CheckMaterial,
);
