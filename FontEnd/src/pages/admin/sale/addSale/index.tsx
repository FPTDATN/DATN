import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateDiscountsMutation } from '@/services/discount';
import { isValid, parseISO, isBefore } from 'date-fns';

interface AddCategoryProps {
   handleModalClose: () => void;
}
const AddSale: React.FC<AddCategoryProps> = ({ handleModalClose }) => {
   const [form] = Form.useForm();
   const [mutateCreateCategory] = useCreateDiscountsMutation();
   const [isLoading, setIsLoading] = useState(false);
   const onFinish = async (values: any) => {
      try {
         setIsLoading(true);
         if (
            !isValid(parseISO(values.startDate)) ||
            !isValid(parseISO(values.endDate)) ||
            !isBefore(parseISO(values.startDate), parseISO(values.endDate))
         ) {
            toast.error('Ngày không hợp lệ hoặc ngày kết phải sau ngày tạo');
            return;
         }
         await mutateCreateCategory(values).unwrap();

         form.resetFields();
         toast.success('Tạo mã giảm giá thành công');
         handleModalClose();
      } catch (error) {
         toast.error('Tạo mã giảm giá không thành công');
      } finally {
         setIsLoading(false);
      }
   };
   return (
      <>
         <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
         >
            <Form.Item
               label="Mã code"
               name="code"
               rules={[
                  { required: true, message: 'Vui lòng nhập mã giảm giá ' },
                  { min: 5, message: 'Ít nhất 5 ký tự' },
                  { max: 12, message: 'Không lớn hơn 12 kí tự' },
               ]}
            >
               <Input placeholder="Mã code " />
            </Form.Item>
            <Form.Item
               label="giảm giá "
               name="discount"
               rules={[
                  { required: true, message: 'Vui lòng nhập phần trăm giảm giá  ' },
               ]}
            >
               <Input placeholder="Mã code " />
            </Form.Item>
            <Form.Item
               label="Số lượng "
               name="count"
               rules={[
                  { required: true, message: 'Vui lòng nhập số lượng mã giảm giá  ' },
               ]}
            >
               <Input placeholder="Mã code " />
            </Form.Item>
            <Form.Item
               label="Ngày tạo"
               name="startDate"
               rules={[
                  { required: true, message: 'Vui lòng nhập ngày tạo' },
                  { type: 'date', message: 'Vui lòng nhập đúng định dạng ngày' },
               ]}
            >
               <Input placeholder="Ngày tạo" type="date" />
            </Form.Item>
            <Form.Item
               label="Ngày kết"
               name="endDate"
               rules={[
                  { required: true, message: 'Vui lòng nhập ngày kết' },
                  { type: 'date', message: 'Vui lòng nhập đúng định dạng ngày' },
               ]}
            >
               <Input placeholder="Ngày kết" type="date" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
               <Button type="primary" className='bg-primary' htmlType="submit" loading={isLoading}>
                  Tạo danh mục
               </Button>
            </Form.Item>
         </Form>
      </>
   );
};
export default AddSale;
