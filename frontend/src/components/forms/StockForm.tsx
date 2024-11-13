import React from 'react';
import { Modal, Form, InputNumber } from 'antd';
import { api } from '../../services/api';

interface StockFormProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

const StockForm: React.FC<StockFormProps> = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await api.updateStock(values);
            form.resetFields();
            onSubmit();
        } catch (error) {
            console.error('Failed to update stock:', error);
        }
    };

    return (
        <Modal
            open={visible}
            title="Update Stock"
            onCancel={onCancel}
            onOk={handleSubmit}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="productId" label="Product ID" rules={[{ required: true }]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StockForm;