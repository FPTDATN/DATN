import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Select, Space, Upload, UploadProps } from 'antd';
import { AiOutlineUpload } from 'react-icons/ai';
import { useGetCategoriesQuery } from '@/services/category';
type SizeType = Parameters<typeof Form>[0]['size'];
const props: UploadProps = {
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
  ],
};

const AddProduct: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [value, setValue] = useState<string | number | null>('');
  const { TextArea } = Input;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Change:', e.target.value);
  };
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  // Fetch categories using useGetCategoriesQuery
  const { data: categories } = useGetCategoriesQuery();

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên sản phẩm">
        <Input placeholder='Tên sản phẩm' type='text' />
      </Form.Item>
      <Form.Item label="Giá gốc">
        <Input placeholder='Giá gốc sản phẩm' type='number' />
      </Form.Item>
      <Form.Item label="Giá sale">
        <Input placeholder='Giá sale sản phẩm' type='number' />
      </Form.Item>
      <Form.Item label="Số lượng">
        <Space>
          <InputNumber min={1} max={10} value={value} onChange={setValue} />
          <Button
            type="dashed"
            onClick={() => {
              setValue(99);
            }}
          >
            Reset
          </Button>
        </Space>
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          onChange={onChange}
          placeholder="Mô tả sản phẩm"
        />
      </Form.Item>

      <Form.Item label="Danh mục">
        <Select placeholder='Danh mục'>
          {categories?.docs.map((category) => (
            <Select.Option key={category._id} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Ảnh chính">
        <Upload {...props}>
          <Button icon={<AiOutlineUpload />}>Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
