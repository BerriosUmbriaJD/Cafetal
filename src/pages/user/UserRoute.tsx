import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/AuthStore';

const UserRoute: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const isCustomer = user?.role === 'customer';
    return isCustomer ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;