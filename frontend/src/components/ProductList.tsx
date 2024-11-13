import React, { useEffect, useState } from 'react';
import {Table, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { Product, api } from '../services/api';
import ProductForm from "./forms/ProductForm.tsx";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await api.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'In Stock', dataIndex: 'stock', key: 'inStock' },
        { title: 'Published', dataIndex: 'published', key: 'published', render: (published: boolean) => published ? 'Yes' : 'No' },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                Add Product
            </Button>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={products}
            />
            <ProductForm
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={() => {
                    setIsModalVisible(false);
                    fetchProducts();
                }}
            />
        </div>
    );
};

export default ProductList;