import React, { useEffect } from 'react';
import { connect } from 'umi';
import {
  Modal,
  Form,
  Input, Switch
} from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ModalForm = ({ visible, onCreate, onCancel, cRef, ...props }) => {
  const [form] = Form.useForm();

  const { loading } = props
  useEffect(() => {
    props.dispatch({
      type: 'dictionaries/setState',
      params: { formRef: form },
    });
  }, []);

  return (
    <Modal
      confirmLoading={loading && loading.models.dictionaries}
      forceRender
      width={460}
      visible={visible}
      title={props.title}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
      }}
    >
      <Form
        form={form}
        {...layout}
        initialValues={{ IsModify: true, IsEnable: true }}
        name="dictionaries"
      >
        <Form.Item
          name="DictSortName"
          label="字典分类名称"
          rules={[
            {
              required: true,
              message: '请输入字典分类名称！',
            },
          ]}
        >
          <Input placeholder="请输入字典分类名称！" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="DictSortCode"
          label="字典分类项编码"
          rules={[
            {
              required: true,
              message: '请输入字典分类项编码！',
            },
          ]}
        >
          <Input placeholder="请输入字典分类项编码！" maxLength={100} />
        </Form.Item>
        <Form.Item
          name="ListOrder"
          label="排序"
          rules={[
            {
              required: true,
              message: '请输入顺序号！',
            },
          ]}
        >
          <Input placeholder="请输入顺序号！" maxLength={10} />
        </Form.Item>
        <Form.Item
          name="Remark"
          label="备注"
        >
          <Input.TextArea placeholder="备注" autoSize={{ minRows: 2, maxRows: 6 }} maxLength={500} />
        </Form.Item>
        <Form.Item
          name="IsModify"
          label="是否允许修改"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="IsEnable"
          label="是否启用"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ dictionaries, loading }) => ({ ...dictionaries, loading }))(ModalForm);
