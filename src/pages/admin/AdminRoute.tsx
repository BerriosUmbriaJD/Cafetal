import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/stores/AuthStore';

const AdminRoute: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.role === 'owner' || user?.role === 'barista' || user?.role === 'admin';
    return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;