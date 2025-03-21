import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from '@/stores/AuthStore';
import { Link } from 'react-router';

export const DashboardNav = () => {
  const { logout } = useAuthStore((state) => state)

  return (
    <header className="sticky top-0 z-10 border-b border-b-[#d4c9bd] bg-[#f8f3e9]/80 backdrop-blur-sm">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <div>
       <Link className="flex items-center" to="/admin">
        <Coffee className="mr-2 h-6 w-6 text-[#7d5a50]" />
        <span className="text-xl font-bold text-[#7d5a50]">Coffee Cafetal</span>
       </Link>
      </div>
      <nav className="hidden space-x-6 md:flex">
        <Link to="/admin/inventory" className="text-[#7d5a50] font-semibold">Inventario</Link>
        <Link to="/admin/settings" className="text-[#7d5a50] font-semibold">Opciones</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Button onClick={logout} className="bg-[#7d5a50] text-white hover:bg-[#6c4a40] cursor-pointer">
          Cerrar sesión
        </Button>
      </div>
    </div>
  </header>
  )
}