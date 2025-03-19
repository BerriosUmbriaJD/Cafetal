import { CoffeeBatch } from "@/types";

interface StatCardProps {
  title?: string;
  value?: number;
  description?: string;
  icon?: React.ReactNode;
  batch?: CoffeeBatch
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StatCard = ({ title, value, description, icon, batch }: StatCardProps) => {
  return (
    <Card className="border-[#d4c9b7] w-[320px]">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-sm font-medium text-[#a98467]">{title}</CardTitle>
        <div className="rounded-full bg-[#f8f3e9]">{icon}</div>
      </CardHeader>
      <CardContent>
        {
          batch 
          ? (
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-[#7d5a50]">Tipo: <span className="text-[#a98467]">{batch.type}</span></span>
              <span className="font-bold text-[#7d5a50]">Cantidad: <span className="text-[#a98467]">{batch.quantity}</span></span>
            </div>
          )
          : (
            <>
              <div className="text-2xl font-bold text-[#7d5a50]">{value}</div>
              <p className="text-[#7d5a50] text-sm">{description}</p>
            </>
          )
        }
      </CardContent>
    </Card>
  )
}