import { Form, Input, Select } from 'antd';
import { useState } from 'react';

 const UpdateUser: React.FC = () => {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const OPTIONS = ['Admin', 'member', 'personnel'];
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

    type FieldType = {
        username?: string;
        password?: string;
        role?: string;
        phone?: number;
        email?: string;
        address?: string;
    };
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"

                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"

                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Password"
                    name="password"

                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"

                    rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item<FieldType>
                    label="address"
                    name="address"

                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Chức vụ"
                    name="role"
                    rules={[{ required: true, message: 'Hãy chọn roll cho tài khoản' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Hãy chọn chưc vụ cho tài khoản"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={{ width: '100%' }}
                        options={filteredOptions.map((item) => ({
                            value: item,
                            label: item,
                        }))}
                    />
                </Form.Item>

            </Form>
        </>
    )
}

export default UpdateUser