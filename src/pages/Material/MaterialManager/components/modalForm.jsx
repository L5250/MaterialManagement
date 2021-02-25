import React, { useState, useImperativeHandle, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal, Form, Input, Radio, Row, Col, Upload, message, Table, Select, Space, Image } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const { Option } = Select
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const layoutSingle = {
  labelCol: { span: 4 },
};

async function getBase64(img, callback) {
  const reader = new FileReader();
  await reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();
  const [literVisible, setLiterVisible] = useState(false);
  const [caseVisible, setCaseVisible] = useState(false);
  const [editorState, setEeditorState] = useState(BraftEditor.createEditorState(null));

  const { dispatch, literKeys, loading, isAddLiter, isEditor, imageUrl64 } = props;
  useEffect(() => {
    props.dispatch({
      type: 'materialManager/setState',
      params: { formRef: form },
    });
  }, []);
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请选择JPG/PNG格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片最大不超过2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj,
        imageUrl => {
          // console.log(imageUrl)
          dispatch({
            type: "materialManager/setState",
            params: {
              imageUrl64: imageUrl
            }
          })
          form.setFieldsValue({ Symbol: imageUrl })
        }
      );
      form.setFieldsValue({ Symbol: imageUrl64 })
    }
  };

  // 打开文献弹框
  const openLiter = (add) => {
    console.log(form.getFieldValue());
    const LiterIds = form.getFieldValue('LiterIds') || '';
    console.log(LiterIds);
    const keys = LiterIds.split(',');
    console.log(keys);
    dispatch({
      type: 'materialManager/setState',
      params: { isAddLiter: add },
    });
    if (add) {
      dispatch({
        type: 'materialManager/getValidLiterInfo',
        params: { literIds: keys },
      }).then((res) => {
        if (res.State) {
          setLiterVisible(true);
          // dispatch({
          //   type: 'materialManager/setState',
          //   params: { isAddLiter: add },
          // });
        }
      });
    } else {
      dispatch({
        type: 'materialManager/getLiterInfo',
        params: { literIds: keys },
      }).then((res) => {
        if (res.State) {
          setLiterVisible(true);
          // dispatch({
          //   type: 'materialManager/setState',
          //   params: { literKeys: keys },
          // });
        }
      });
    }

  };
  // 文献弹框表格
  const literColumns = [
    { dataIndex: 'LiterName', title: '文献名称', align: 'center' },
    { dataIndex: 'LiterYear', title: '文献年份', align: 'center', width: 120 },
    { dataIndex: 'LiterCode', title: '文献DOI号', align: 'center', width: 150 },
    { dataIndex: 'Remark', title: '备注', align: 'center', width: 200 },
  ];
  // 文献弹框确定
  const literOk = () => {
    console.log(props);
    console.log(props.literKeys.join());
    form.setFieldsValue({ LiterIds: props.literKeys.join() });
    setLiterVisible(false);
    console.log(form.getFieldValue());
  };

  // 应用实例
  const openCase = (edit) => {
    const Examples = form.getFieldValue('Examples');
    dispatch({ type: "materialManager/setState", params: { isEditor: edit } })
    const htmlString = Examples || null;
    setEeditorState(BraftEditor.createEditorState(htmlString));
    setCaseVisible(true);
  };

  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editorState.toHTML();
    const Examples = JSON.stringify(htmlContent)
    form.setFieldsValue({ Examples })
    setCaseVisible(false)
  };

  const handleEditorChange = (data) => {
    setEeditorState(data);
  };
  // 实例弹框确定
  const caseOk = () => {
    submitContent();
  };
  return (
    <Modal
      confirmLoading={loading && loading.models.materialManager}
      centered
      forceRender
      width={760}
      visible={visible}
      title={props.title}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          onCreate(values);
        });
      }}
    >
      <Form
        form={form}
        {...layout}
        name="materialManager"
        initialValues={{ MSDSEdition: 1 }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="MaterialName"
              label="常用名"
              rules={[
                {
                  required: true,
                  message: '常用名为必填项',
                },
              ]}
            >
              <Input placeholder="请输入常用名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="MaterialEName"
              label="英文名"
              rules={[
                {
                  required: true,
                  message: '英文名为必填项',
                },
              ]}>
              <Input placeholder="请输入英文名" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="MaterialRecordCode" label="CAS号"
              rules={[
                {
                  required: true,
                  message: 'CAS号为必填项',
                },
              ]}>
              <Input placeholder="请输入CAS号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="MolecularWeight" label="分子量">
              <Input placeholder="请输入分子量" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Density" label="密度">
              <Input placeholder="请输入密度" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="BoilingPoint" label="沸点">
              <Input placeholder="请输入沸点" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ChemicalFormula" label="分子式"
              rules={[
                {
                  required: true,
                  message: "分子式为必填项"
                }
              ]}
            >
              <Input placeholder="请输入分子式" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="MeltingPoint" label="熔点">
              <Input placeholder="请输入熔点" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="FlashPoint" label="闪点">
              <Input placeholder="请输入闪点" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="SignalWords" label="信号词">
              <Input placeholder="请输入信号词" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="MSDSEdition" label="MSDN">
              <Radio.Group>
                <Radio value={1}>中文版</Radio>
                <Radio value={2}>美版</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="qqq" label="应用场景">
              <Select placeholder="请选择应用场景">
                <Option value="jack">基底材料</Option>
                <Option value="lucy">电解质材料</Option>
                <Option value="a">粘接剂</Option>
                <Option value="v">外壳材料</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Symbol"
              label="上传文件"
            >
              <Space direction="vertical">
                <Upload
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  onChange={handleChange}
                ><Button style={{ width: "100%" }} icon={<UploadOutlined />}>上传</Button>
                </Upload>
                <Image src={imageUrl64} style={{ height: 112, width: "auto", maxWidth: 220 }} />
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="as2d" label="材料自愈类型">
              <Select mode="multiple" placeholder="">
                <Option value="jack">高分子聚合物</Option>
                <Option value="lucy">氢键</Option>
                <Option value="1">静电作用</Option>
                <Option value="2">硼酸脂键</Option>
                <Option value="3">液态金属</Option>
                <Option value="5">镓系</Option>
                <Option value="4">镓铟合金</Option>
                <Option value="6">铟系</Option>
                <Option value="7">钠钾合金</Option>
                <Option value="8">其它</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="LiterIds" label="相关文献">
              <Space>
                <Button
                  onClick={() => openLiter(false)}
                  type="primary"
                  loading={loading && loading.models.materialManager}
                >查看</Button>
                <Button
                  onClick={() => openLiter(true)}
                  type="primary"
                  loading={loading && loading.models.materialManager}
                >添加</Button>
              </Space>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="Examples" label="应用实例">
              <Space>
                <Button loading={loading && loading.models.materialManager} onClick={() => openCase(false)} type="primary">查看</Button>
                <Button loading={loading && loading.models.materialManager} onClick={() => openCase(true)} type="primary">添加</Button>
              </Space>

            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* 相关文献 */}
      <Modal
        confirmLoading={loading && loading.models.materialManager}
        visible={literVisible}
        centered
        width={1200}
        height={500}
        okText="确定"
        cancelText="取消"
        title={'相关文献'}
        onOk={literOk}
        onCancel={() => setLiterVisible(false)}
      >
        <Table
          columns={literColumns}
          dataSource={props.literData}
          rowKey="LiterId"
          pagination={false}
          rowSelection={isAddLiter ? {
            type: 'checkbox',
            selectedRowKeys: literKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              dispatch({
                type: 'materialManager/setState',
                params: { literKeys: selectedRowKeys, literRows: selectedRows },
              });
            },
          } : false}
        />
      </Modal>

      {/* 应用实例 */}
      <Modal
        confirmLoading={loading && loading.models.materialManager}
        visible={caseVisible}
        centered
        width={1200}
        okText="确定"
        cancelText="取消"
        title={'应用实例'}
        onOk={caseOk}
        onCancel={() => setCaseVisible(false)}
      >
        <BraftEditor
          controlBarClassName={isEditor ? "" : "editorNoStyle"}
          readOnly={!isEditor}
          value={editorState}
          onChange={handleEditorChange}
          onSave={submitContent}
        />
      </Modal>
    </Modal>
  );
};
export default connect(({ materialManager, loading }) => ({ ...materialManager, loading }))(
  ModalForm,
);
