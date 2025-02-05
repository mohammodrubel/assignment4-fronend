import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import DashbaordProfile from '../components/ui/DashboardProfile';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          theme="light"
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to="/dashboard">Home</Link>,
            },
            {
              key: '2',
              icon: <ShoppingOutlined />,
              label: 'Products',
              children: [
                {
                  key: '2-1',
                  icon: <PlusOutlined />,
                  label: <Link to="/dashboard/create-product">Create Product</Link>,
                },
                {
                  key: '2-2',
                  icon: <UnorderedListOutlined />,
                  label: <Link to="/dashboard/all-product">All Products</Link>,
                },
              ],
            },
            {
              key: '2',
              icon: <ShoppingCartOutlined />,
              label: <Link to="/dashboard/order">Order</Link>,
            },
            {
              key: '3',
              icon: <UnorderedListOutlined />,
              label: <Link to="/dashboard/personal-profile">Profile</Link>,
            },
            {
              key: '3',
              icon: <UnorderedListOutlined />,
              label: <Link to="/dashboard/change-password">Change Password</Link>,
            },

          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: '#fff',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                color: '#595959',
              }}
            />
            <div className="mx-5">
              <DashbaordProfile />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            backgroundColor: '#fff',
            boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
