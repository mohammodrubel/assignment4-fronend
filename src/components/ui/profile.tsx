import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useLogoutMutation } from '../../app/fetchers/auth/authApi';
import { logout, userCurrentInformation } from '../../app/fetchers/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';

const ProfileDropdown = () => {
  const product = useAppSelector((state) => state?.products.cartItem);
  const user = useAppSelector(userCurrentInformation);
  const [userLogout] = useLogoutMutation();
  const dispatch = useAppDispatch();

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

  const dashboard = useAppSelector((state) => state?.auth?.user?.role);

  // Type the menu items explicitly
  const menuItems: { key: string; label: JSX.Element; icon?: JSX.Element }[] = [
    user
      ? {
          key: '3',
          label: <Link to='/' onClick={handleLogout}>Logout</Link>,
          icon: <LogoutOutlined />,
        }
      : {
          key: '3',
          label: <Link to='/login'>Login</Link>,
          icon: <LogoutOutlined />,
        },
    user && {
      key: '2',
      label: <Link to='/user/my-order' className='flex items-center gap-2'><SettingOutlined />Profile</Link>,
    },
    dashboard === 'admin' && {
      key: '4',
      label: <Link to='/dashboard'>Dashboard</Link>,
      icon: <SettingOutlined />,
    },
  ].filter(Boolean) as { key: string; label: JSX.Element; icon?: JSX.Element }[]; // Type assertion to ensure valid items

  return (
    <div className="flex gap-2 items-center justify-center">
      <Link to='/cart' className='relative'>
        <i className="text-2xl fa-solid text-white fa-cart-shopping"></i>
        {user && <p className="absolute top-[-5px] left-[10px] bg-red-500 text-white text-xs px-1 rounded-full">{product?.length || 0}</p>}
      </Link>
      <Link to='/wishlist' className='relative'>
        <i className="text-2xl text-red-500 fa-solid fa-heart"></i>
        {user && <p className="absolute top-[-5px] left-[10px] bg-red-500 text-white text-xs px-1 rounded-full">0</p>}
      </Link>
      <Dropdown overlay={<Menu items={menuItems} />} placement="bottomRight" trigger={['click']}>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{
            cursor: 'pointer',
            backgroundColor: user ? '#2cb1ec' : undefined,
          }}
        />
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
