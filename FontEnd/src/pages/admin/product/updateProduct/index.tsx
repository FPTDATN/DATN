import React, { useState } from 'react';
import {

    Button,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Space,
    UploadFile,
    UploadProps,


} from 'antd';
import ImgCrop from 'antd-img-crop';

import Upload, { RcFile } from 'antd/es/upload';

type SizeType = Parameters<typeof Form>[0]['size'];

const UpdateProduct: React.FC = () => {

    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const [value, setValue] = useState<string | number | null>('99');
    const { TextArea } = Input;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };
    //upload image
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChangeImg: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as RcFile);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
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
            <Form.Item label="Giá gốc ">
                <Input placeholder='Giá gốc sản phẩm' type='number' />
            </Form.Item>
            <Form.Item label="Giá sale ">
                <Input placeholder='Giá sale sản phẩm' type='number' />
            </Form.Item>
            <Form.Item label="Số lượng ">
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
            <Form.Item label="Mô tả ">
                <TextArea
                    showCount
                    maxLength={100}
                    style={{ height: 120, marginBottom: 24 }}
                    onChange={onChange}
                    placeholder="Mô tả sản phẩm "
                />
            </Form.Item>

            <Form.Item label="Danh mục">
                <Select placeholder='Danh mục'>
                    <Select.Option value="demo">Category</Select.Option>
                    <Select.Option value="demo">Category</Select.Option>
                    <Select.Option value="demo">Category</Select.Option>

                </Select>
            </Form.Item>

            <Form.Item label="Ảnh ">
                <ImgCrop rotationSlider>
                    <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChangeImg}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;