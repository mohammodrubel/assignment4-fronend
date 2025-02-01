import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

const DashbaordProfile= () => {
  const menuItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
      
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
     
    },
    {
      key: '3',
      label: <Link to='/login'>Login</Link>,
      icon: <LogoutOutlined />,
    },
  ];

  const menu = (
    <Menu
      items={menuItems}
    />
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Avatar
        size="large"
        icon={<UserOutlined />}
        style={{ cursor: 'pointer', }}
      />
    </Dropdown>
  );
};

export default DashbaordProfile;
