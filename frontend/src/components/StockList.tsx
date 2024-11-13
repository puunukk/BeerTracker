import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Stock, api } from '../services/api';
import StockForm from './forms/StockForm';

const StockList: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const data = await api.getStocks();
            setStocks(data);
        } catch (error) {
            console.error('Failed to fetch stocks:', error);
        }
    };

    const columns = [
        { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
        { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                Update Stock
            </Button>
            <Table dataSource={stocks} columns={columns} rowKey="id" />
            <StockForm
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={() => {
                    setIsModalVisible(false);
                    fetchStocks();
                }}
            />
        </div>
    );
};

export default StockList;