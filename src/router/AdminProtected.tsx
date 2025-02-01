import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../app/fetchers/auth/authApi';
import { logout, userCurrentInformation, userCurrentToken } from '../app/fetchers/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';

function AdminProtected({ children }: { children: ReactNode }) {
    const token = useAppSelector(userCurrentToken);
    const user = useAppSelector(userCurrentInformation)
    const [logoutUser] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            if (!token || user?.role !== 'admin') {
                try {
                    await logoutUser().unwrap();
                    dispatch(logout());
                    navigate('/');
                } catch (error) {
                    console.error("Failed to log out:", error);
                }
            }
        };

        handleLogout();
    }, [token, logoutUser, dispatch, navigate,user]);

    if (!token || user?.role !== 'admin') {
      return null;
  }
    


    return <>{children}</>;
}

export default AdminProtected;
