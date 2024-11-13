import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Transaction, api } from '../services/api';
import TransactionForm from './forms/TransactionForm';

const TransactionList: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await api.getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    const columns = [
        { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
        { title: 'User ID', dataIndex: 'userId', key: 'userId' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Timestamp', dataIndex: 'createdAt', key: 'createdAt' },
    ];

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                Add Transaction
            </Button>
            <Table dataSource={transactions} columns={columns} rowKey="id" />
            <TransactionForm
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSubmit={() => {
                    setIsModalVisible(false);
                    fetchTransactions();
                }}
            />
        </div>
    );
};

export default TransactionList;