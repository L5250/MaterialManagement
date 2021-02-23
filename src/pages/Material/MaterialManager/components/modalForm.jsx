import React, { useState, useImperativeHandle, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal, Form, Input, Radio, Row, Col, Upload, message, Table } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const layoutSingle = {
  labelCol: { span: 4 },
};
const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();
  const [literVisible, setLiterVisible] = useState(false)
  const [caseVisible, setCaseVisible] = useState(false)

  const imageUrl = form.getFieldValue('image');

  const { dispatch, literKeys, loading } = props
  useEffect(() => {
    props.dispatch({
      type: 'materialManager/setState',
      params: { formRef: form },
    });
  }, []);
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {props.loading && props.loading.global ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // 打开文献弹框
  const openLiter = () => {
    const keys = form.getFieldValue("LiterIds").split(",")
    console.log(keys);
    dispatch({
      type: "materialManager/setState",
      params: { literKeys: keys }
    })
    setLiterVisible(true)
  }
  // 文献弹框表格
  const literColumns = [
    { dataIndex: "LiterName", title: "文献名称", align: "center" },
    { dataIndex: "LiterYear", title: "文献年份", align: "center", width: 120 },
    { dataIndex: "LiterCode", title: "文献DOI号", align: "center", width: 150 },
    { dataIndex: "Remark", title: "备注", align: "center", width: 200 },
  ]
  // 文献弹框确定
  const literOk = () => {
    console.log(props);
    form.setFieldsValue({ LiterIds: props.literKeys.join() })
    setLiterVisible(false)
  }


  // 应用实例
  const openCase = () => {
    const keys = form.getFieldValue("Examples")
    console.log(keys);
    // dispatch({
    //   type: "materialManager/setState",
    //   params: { literKeys: keys }
    // })
    setCaseVisible(true)
  }

  // 实例弹框确定
  const caseOk = () => {
    console.log(1);
    form.setFieldsValue({ Examples: 1 })
  }


  return (
    <Modal
      confirmLoading={loading && loading.global}
      forceRender
      width={760}
      visible={visible}
      title={props.title}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        {...layout}
        name="materialManager"
      // initialValues={props.formData}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="MaterialName"
              label="常用名"
              rules={[
                {
                  required: true,
                  message: 'Input something!',
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="MaterialEName" label="英文名">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="MaterialRecordCode" label="CAS号">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="MolecularWeight" label="分子量">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Density" label="密度">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="BoilingPoint" label="沸点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ChemicalFormula" label="分子式">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="MeltingPoint" label="熔点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="FlashPoint" label="闪点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="SignalWords" label="信号词">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item {...layoutSingle} name="MSDSEdition" label="MSDN">
              <Radio.Group>
                <Radio value={1}>中文版</Radio>
                <Radio value={2}>美版</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item {...layoutSingle} name="Symbol" label="上传文件" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                maxCount={1}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                    uploadButton
                  )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="LiterIds" label="相关文献">
              <Button onClick={openLiter} type="primary">查看/添加</Button>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="Examples" label="应用实例">
              <Button onClick={openCase} type="primary">查看/添加</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* 相关文献 */}
      <Modal
        confirmLoading={loading && loading.global}
        visible={literVisible} centered width={1200} height={500} okText="确定" cancelText="取消" title={"相关文献"} onOk={literOk} onCancel={() => setLiterVisible(false)} >
        <Table
          columns={literColumns}
          dataSource={props.literData}
          rowKey="LiterId"
          pagination={false}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: literKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              dispatch({
                type: "materialManager/setState",
                params: { literKeys: selectedRowKeys, literRows: selectedRows }
              })
            },
          }}

        />
      </Modal>

      {/* 应用实例 */}
      <Modal
        confirmLoading={loading && loading.global}
        visible={caseVisible} centered width={1200} height={500} okText="确定" cancelText="取消" title={"应用实例"} onOk={caseOk} onCancel={() => setCaseVisible(false)} >

      </Modal>

    </Modal>
  );
};
export default connect(({ materialManager, loading }) => ({ ...materialManager, loading }))(
  ModalForm,
);
