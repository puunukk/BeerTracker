import React, { useEffect, useState } from 'react';
import { Button, List, Switch, Tag} from 'antd';
import {DollarOutlined, FieldNumberOutlined, PlusOutlined} from '@ant-design/icons';
import { Product, api } from '../services/api';
import ProductForm from "./forms/ProductForm.tsx";

const LandingPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

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

    return (
        <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCartOpen(true)}>
                Add Product
            </Button>
            <List
                rowKey="id"
                dataSource={products}
                renderItem={(product, productIndex) => {
                    return (
                        <List.Item
                            key={productIndex}
                            extra={
                            <Button.Group
                                key={`actions-${productIndex}`}
                                style={{
                                    borderRadius: 50
                                }}
                            >
                                <Button >-</Button>
                                <Button >add</Button>
                                <Button >+</Button>
                            </Button.Group>
                            }
                        >
                            <List.Item.Meta
                                title={product.name}
                                description={product.description}
                            />
                            {'price' in product && typeof product.price == 'number' &&
                                <Tag
                                    bordered={false}
                                    color={'green'}
                                    icon={<DollarOutlined />}
                                >
                                    {product.price === 0 ? 'free' : product.price}
                                </Tag>
                            }
                            {'stock' in product && typeof product.stock == 'number' &&
                                <Tag
                                    bordered={false}
                                    color={product.stock > 9 ? 'blue' : 'red'}
                                    icon={<FieldNumberOutlined/>}
                                >
                                    {product.stock}
                                </Tag>
                            }
                            <Tag
                                bordered={false}
                                color={'green'}
                                icon={<>$ </>}
                            >{product.status}</Tag>
                        </List.Item>
                    )
                }}
            />

            <ProductForm
                visible={isCartOpen}
                onCancel={() => setIsCartOpen(false)}
                onSubmit={() => {
                    setIsCartOpen(false);
                    fetchProducts();
                }}
            />
        </div>
    );
};

export default LandingPage;