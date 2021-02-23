import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Button, Modal, Form, Input, Radio, Row, Col, Upload, message, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const { Option } = Select;
const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();

  const imageUrl = form.getFieldValue('image');
  const { loading } = props
  useEffect(() => {
    props.dispatch({
      type: 'materialEnter/setState',
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
      {props.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


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
      }}
    >
      <Form
        form={form}
        {...layout}
        name="materialEnter"
      // initialValues={props.formData}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
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
            <Form.Item name="address" label="英文名">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="key" label="CAS号">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="分子量">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="密度">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="沸点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="分子式">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="熔点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="闪点">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="常用名" label="信号词">
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="asd" label="MSDN">
              <Radio.Group>
                <Radio value={1}>中文版</Radio>
                <Radio value={2}>美版</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="as2d" label="应用场景">
              <Select defaultValue="lucy">
                <Option value="jack">基底材料</Option>
                <Option value="lucy">电解质材料</Option>
                <Option value="Yiminghe">粘接剂</Option>
                <Option value="Yiminghe">外壳材料</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="image" label="上传文件">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
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
            <Form.Item name="as2d" label="材料自愈类型">
              {/* <Button onClick={addType} icon={<PlusOutlined />} >添加</Button> */}
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
            <Form.Item name="常用名" label="相关文献">
              <Button type="primary">查看/添加</Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="应用实例" label="应用实例">
              <Button type="primary">查看/添加</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default connect(({ materialEnter, loading }) => ({ ...materialEnter, loading }))(ModalForm);
