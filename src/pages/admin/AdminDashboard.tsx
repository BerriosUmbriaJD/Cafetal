import { DashboardNav } from '@/components/app/DashboardNav';
import { Outlet } from 'react-router';

export const AdminDashboard = () => {
  return (
    <main className="max-w-full min-h-screen bg-[#f8f3e9]">
      <DashboardNav />
      <Outlet />
    </main>
  )
}
  