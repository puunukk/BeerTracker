import React from 'react';
import {Modal, Form, Input, InputNumber, Switch, Flex} from 'antd';
import {api} from "../../services/api.ts";

interface ProductFormProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await api.createProduct(values);
            form.resetFields();
            onSubmit();
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <Modal
            open={visible}
            title="Add New Product"
            onCancel={onCancel}
            onOk={handleSubmit}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="price" label="Price">
                    <InputNumber
                        stringMode={false}
                        prefix={'€'}
                        step={'0.01'}
                        min={0}
                    />
                </Form.Item>
                <Form.Item
                    name="published"
                    label="Published"
                    valuePropName="checked"
                    layout={'horizontal'}
                >
                    <Flex justify={'end'}>
                        <Switch checkedChildren={'I'} unCheckedChildren={'O'} />
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductForm;