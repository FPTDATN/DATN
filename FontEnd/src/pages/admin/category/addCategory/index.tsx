import React from 'react';
import { Form, Input, Button, notification } from 'antd';

import { useCreateCategoryMutation } from '@/services/category';

interface AddCategoryProps {
  handleModalClose: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ handleModalClose }) => {
  const [form] = Form.useForm();
  const [mutateCreateCategory] = useCreateCategoryMutation();

  const onFinish = async (values: any) => {
    try {
      await mutateCreateCategory(values).unwrap();

      form.resetFields();
      notification.success({ message: "Tạo danh mục thành công" });
      handleModalClose(); 

    } catch (error) {
      notification.error({ message: "Tạo danh mục không thành công" });
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[
          { required: true, message: 'Vui lòng nhập tên danh mục' },
          { min: 2, message: 'Ít nhất 2 ký tự' },
        ]}
      >
        <Input placeholder="Tên danh mục" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" className='bg-primary'  htmlType="submit">
          Tạo danh mục
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;