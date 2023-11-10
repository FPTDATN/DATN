import { provinces } from '@/seeds';
import { Button, Form, Input, Select, Spin } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
    role?: string;
    phone?: number;
    email?: string;
    address?: string;
};

const { Option } = Select;

const UpdateAccount: React.FC = () => {


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    // initialValue={userData?.data.username}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    // initialValue={userData?.data.email}
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    // initialValue={userData?.data.password}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"
                    // initialValue={`0${userData?.data.phone}`}
                    rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Địa chỉ"
                    name="address"
                    // initialValue={userData?.data.address}
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Select>
                        {provinces.map((prov) => (
                            <Option key={prov.value} value={prov.value}>
                                {prov.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>


                    <Button htmlType="submit" type="default" className="ml-2">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>

        </>
    );
};

export default UpdateAccount;
