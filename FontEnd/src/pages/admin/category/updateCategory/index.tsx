import React, { useState } from 'react';
import {

    Form,
    Input,


} from 'antd';

type SizeType = Parameters<typeof Form>[0]['size'];


const UpdateCategory: React.FC = () => {

    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
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

            <Form.Item label="Tên ">
                <Input type='text' value={'Danh mục a'} />
            </Form.Item>

        </Form>
    );
};

export default UpdateCategory;