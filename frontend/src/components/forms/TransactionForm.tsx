import React from 'react';
import { Modal, Form, InputNumber, Select } from 'antd';
import { api } from '../../services/api';

interface TransactionFormProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await api.createTransaction(values);
            form.resetFields();
            onSubmit();
        } catch (error) {
            console.error('Failed to create transaction:', error);
        }
    };

    return (
        <Modal
            open={visible}
            title="Add New Transaction"
            onCancel={onCancel}
            onOk={handleSubmit}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="productId" label="Product ID" rules={[{ required: true }]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="add">Add</Select.Option>
                        <Select.Option value="remove">Remove</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TransactionForm;