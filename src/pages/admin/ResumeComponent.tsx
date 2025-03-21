import { useEffect } from 'react';
import { useAdminStore } from '@/stores/AdminStore';
import { StatCard } from './StatCard';
import { Coffee, ListOrdered, Pickaxe, Box } from 'lucide-react';

export const ResumeComponent = () => {

  const {
    coffeeInventory,
    orders,
    reports,
    loadCoffeeInventory,
    loadOrders,
  } = useAdminStore();

  useEffect(() => {
    loadCoffeeInventory(); 
    loadOrders(); 
  }, [loadCoffeeInventory, loadOrders]);

  const totalCoffeeQuantity = coffeeInventory.reduce((sum, batch) => sum + batch.quantity, 0)
  const pendingOrders = orders.filter(order => order.status === 'pending').length
  const lastBatch = coffeeInventory[coffeeInventory.length - 1]
  const lastReport = reports[reports.length - 1]

  return (
    <section className='w-full flex items-center justify-between'>
      <StatCard 
        title='Total de café'
        value={totalCoffeeQuantity}
        description='Total de café disponible'
        icon={<Coffee className='w-6 h-6 text-[#7d5a50]' />}
      />
      <StatCard 
        title='Pedidos pendientes'
        value={pendingOrders}
        description='Pedidos pendientes'
        icon={<ListOrdered className='w-6 h-6 text-[#7d5a50]' />}
      />
      <StatCard 
        title='Producción del último mes'
        value={lastReport?.totalProduction || 0}
        description='Producción del último mes'
        icon={<Pickaxe className='w-6 h-6 text-[#7d5a50]' />}
      />
      <StatCard 
        title='Ultimo lote agregado'
        description='Ultimo lote agregado'
        icon={<Box className='w-6 h-6 text-[#7d5a50]' />}
        batch={lastBatch}
      />
    </section>
  )
}