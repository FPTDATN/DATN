import React, {  useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Select, Space, Upload, UploadProps } from 'antd';
import { AiOutlineUpload } from 'react-icons/ai';
import { useGetCategoriesQuery } from '@/services/category';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '@/services/product';


type SizeType = Parameters<typeof Form>[0]['size'];



const { TextArea } = Input;

interface AddProductProps {
  handleModalClose: () => void;
}

const AddProduct = ({ handleModalClose }: AddProductProps) => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [value, setValue] = useState<string | number | null>('');
  const [mutateCreateProduct] = useCreateProductMutation();
  const [form] = Form.useForm();
  const { data: categories } = useGetCategoriesQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
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

      await mutateCreateProduct({ ...restValues, images }).unwrap();

      form.resetFields();
      toast.success('Tạo sản phẩm thành công');
      handleModalClose();
    } catch (error) {
      toast.error('Tạo sản phẩm không thành công');
    } finally {
      setIsLoading(false);
    }
  };
  // const props: UploadProps = {
  //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       toast.success(`${info.file.name} uploaded successfully`);
    
  //       const imageUrl = info.file.response.url;
  //       setImages((prevImages) => [...prevImages, imageUrl]);
  //     } else if (info.file.status === 'error') {
  //       toast.error(`${info.file.name} upload failed`);
  //     }
  //   },
  //   multiple: true,
  // };
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

      <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Please enter the product name' }]}>
        <Input placeholder="Tên sản phẩm" type="text" />
      </Form.Item>

      <Form.Item label="Giá gốc" name="price">
        <Input placeholder="Giá gốc sản phẩm" type="number" />
      </Form.Item>

      <Form.Item label="Giá sale" name="sale_off">
        <Input placeholder="Giá sale sản phẩm" type="number" />
      </Form.Item>

      <Form.Item label="Số lượng" name="quantity">
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

      <Form.Item label="Mô tả" name="description">
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          onChange={onChange}
          placeholder="Mô tả sản phẩm"
        />
      </Form.Item>

      <Form.Item label="Danh mục" name="categoryId">
        <Select placeholder="Danh mục">
          {categories?.docs.map((category) => (
            <Select.Option key={category._id}>{category.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item label="Ảnh chính" name="images">
        <Upload {...props}>
          <Button icon={<AiOutlineUpload />} type="default">
            Upload
          </Button>
        </Upload>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" className="bg-primary" htmlType="submit" loading={isLoading}>
          Tạo San Pham
        </Button>
      </Form.Item>
    </Form>

  );
};

export default AddProduct;