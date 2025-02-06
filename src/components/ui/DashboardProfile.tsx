import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useLogoutMutation } from '../../app/fetchers/auth/authApi';
import { logout } from '../../app/fetchers/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';

const DashboardProfile = () => {
  const token = useAppSelector((state) => state?.auth?.token);
  const dispatch = useAppDispatch()
  const [userLogout] = useLogoutMutation()
  const handleLogout = async () => {
    try {
      const res = await userLogout().unwrap();
      dispatch(logout());
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  // Define menu items conditionally
  const menuItems = [
    token
    && {
      key: '1',
      label: <Link onClick={handleLogout} to=''>Logout</Link>,
      icon: <LogoutOutlined />,
    }

  ];

  const menu = <Menu items={menuItems as any} />; // Type casting to satisfy TypeScript

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Avatar
        size="large"
        icon={<UserOutlined />}
        style={{ cursor: 'pointer' }}
      />
    </Dropdown>
  );
};

export default DashboardProfile;
