import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Select, Space } from 'antd';

import { useGetCategoriesQuery } from '@/services/category';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '@/services/product';
import { ProductType } from '@/types/Product';

type SizeType = Parameters<typeof Form>[0]['size'];

const { TextArea } = Input;

interface AddProductProps {
  handleModalClose: () => void;
}

const AddProduct = ({ handleModalClose }: AddProductProps) => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [value, setValue] = useState<string | number | null>('');
  const [products, setProducts] = useState<ProductType[]>([]); 
  const [mutateCreateProduct] = useCreateProductMutation();
  const [form] = Form.useForm();
  const { data: categories } = useGetCategoriesQuery();
  const [isLoading, setIsLoading] = useState(false);


  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const onFinish = async (values: any) => { 
    try {
      setIsLoading(true);

      const { size, ...restValues } = values;

      await mutateCreateProduct({ ...restValues }).unwrap();
      const newProduct = { ...restValues };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      form.resetFields();
      toast.success('Tạo sản phẩm thành công');
      handleModalClose();
    } catch (error) {
      toast.error('Tạo sản phẩm không thành công');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm ' }]}>
        <Input placeholder="Tên sản phẩm" type="text" />
      </Form.Item>

      <Form.Item
        label="Giá gốc"
        name="price"
        rules={[
          { required: true, message: 'Vui lòng nhập Giá' },
        ]}
      >
        <Input placeholder="Giá gốc sản phẩm" type="number" />
      </Form.Item>

      <Form.Item label="Giá sale" name="sale_off">
        <Input placeholder="Giá sale sản phẩm" type="number" />
      </Form.Item>

      <Form.Item
        label="Số lượng"
        name="quantity"
        rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm ' }]}
      >
        <Space>
          <InputNumber min={1} max={99} value={value} onChange={setValue} />
          <Button
            type="dashed"
            onClick={() => {
              setValue(0);
            }}
          >
            Reset
          </Button>
        </Space>
      </Form.Item>

      <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập Mô tả ' }]}>
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          onChange={onChange}
          placeholder="Mô tả sản phẩm"
        />
      </Form.Item>

      <Form.Item label="Danh mục" name="categoryId" rules={[{ required: true, message: 'Vui lòng nhập Danh mục' }]}>
        <Select placeholder="Danh mục">
          {categories?.docs.map((category) => (
            <Select.Option key={category._id}>{category.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>



      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" className="bg-primary" htmlType="submit" loading={isLoading}>
          Tạo San Pham
        </Button>
      </Form.Item>
    </Form>

  );
};

export default AddProduct;