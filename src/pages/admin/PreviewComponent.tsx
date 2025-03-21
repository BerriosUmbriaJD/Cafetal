import { ResumeComponent } from './ResumeComponent';
import { OrdersComponent } from './OrdersComponent';
import { InventorySummary } from './InventorySummary';

export const PreviewComponent = () => {
  return (
    <section className="w-full p-12 flex flex-col space-y-10">
    <ResumeComponent />
    <section className='w-full grid grid-cols-2 grid-rows-1 gap-8'>
      <OrdersComponent />
      <InventorySummary />
    </section>
  </section>
  )
}