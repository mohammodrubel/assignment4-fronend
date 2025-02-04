import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, userCurrentToken } from '../app/fetchers/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { useLogoutMutation } from '../app/fetchers/auth/authApi'; // Assuming logout mutation exists

interface ProtectedRouterProps {
  children: ReactNode;
}

function ProtectedRouter({ children }: ProtectedRouterProps) {
  const token = useAppSelector(userCurrentToken);
  const [logoutUser] = useLogoutMutation(); // Use correct logout mutation
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const handleLogout = async () => {
        try {
          await logoutUser().unwrap();
          dispatch(logout());
          navigate('/login');
        } catch (error) {
          console.error('Failed to log out:', error);
        }
      };

      handleLogout();
    }
  }, [token, logoutUser, dispatch, navigate]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRouter;
