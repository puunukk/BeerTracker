import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import ProductList from './components/ProductList';
import TransactionList from "./components/TransactionList.tsx";
import StockList from "./components/StockList.tsx";
import {HomeTwoTone} from "@ant-design/icons";
import LandingPage from "./components/LandingPage.tsx";
import UsersList from "./components/UsersList.tsx";

const { Header, Content } = Layout;

function App() {

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="0" icon={<HomeTwoTone />}><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/users">Users</Link></Menu.Item>
            <Menu.Item key="1"><Link to="/products">Products</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/stocks">In stock</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/transactions">Transactions</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ margin: '16px 0' }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/stocks" element={<StockList />} />
              <Route path="/users" element={<UsersList />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  )
}

export default App
