const API_URL = 'http://localhost:8080';

export interface Product {
    id: number;
    name: string;
    description: string;
    status: string;
    published: boolean;
}

export interface Transaction {
    id: number;
    productId: number;
    userId: number;
    quantity: number;
    type: 'add' | 'remove';
}

export interface Stock {
    id: number;
    productId: number;
    quantity: number;
    timestamp: string;
    lastUpdated: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
}

export const api = {
    getProducts: () => fetchApi<Product[]>('/products'),
    createProduct: (product: Omit<Product, 'id'>) => fetchApi<Product>('/products', {
        method: 'POST',
        body: JSON.stringify(product),
    }),
    getTransactions: () => fetchApi<Transaction[]>('/transactions'),
    createTransaction: (transaction: Omit<Transaction, 'id'>) => fetchApi<Transaction>('/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
    }),
    getStocks: () => fetchApi<Stock[]>('/stocks'),
    updateStock: (stock: Omit<Stock, 'id' | 'timestamp' | 'lastUpdated'>) => fetchApi<Stock>('/stocks', {
        method: 'POST',
        body: JSON.stringify(stock),
    }),
    getUsers: () => fetchApi<User[]>('/users'),
    createUser: (user: Omit<User, 'id'>) => fetchApi<User>('/users', {
        method: 'POST',
        body: JSON.stringify(user),
    }),
    checkManagerStatus: (userId: number) => fetchApi<boolean>(`/managers/${userId}`),
};