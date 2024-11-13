import React, { useEffect, useState } from 'react';
import {Table, Button, Tag, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {api, User} from '../services/api';
import ProductForm from "./forms/ProductForm.tsx";

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const columns = [
        { title: 'Username', dataIndex: 'username', key: 'name', render: (un: string, r: User) => (
            <Space direction={'vertical'}>
                <Tag color={'blue'} style={{ borderRadius: 50 }}>
                    {un}
                </Tag>
                {r.email}
            </Space>
            ) },
        { title: 'name', dataIndex: 'email', key: 'description' },
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
                dataSource={users}
            />
            <ProductForm
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={() => {
                    setIsModalVisible(false);
                    fetchUsers();
                }}
            />
        </div>
    );
};

export default UsersList;