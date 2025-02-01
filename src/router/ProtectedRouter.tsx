import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, userCurrentToken } from '../app/fetchers/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { useLoginMutation } from '../app/fetchers/auth/authApi';

function ProtectedRouter({ children }: { children: ReactNode }) {
    const token = useAppSelector(userCurrentToken);
    const [logoutUser] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            if (!token) {
                try {
                    await logoutUser({}).unwrap();
                    dispatch(logout());
                    navigate('/login');
                } catch (error) {
                    console.error("Failed to log out:", error);
                }
            }
        };

        handleLogout();
    }, [token, logoutUser, dispatch, navigate]);

    if (!token) {
        return null; 
    }

    return <>{children}</>;
}

export default ProtectedRouter;
