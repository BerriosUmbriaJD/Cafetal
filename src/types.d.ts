/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  id: `${string}-${string}-${string}-${string}-${string}`,
  username: string,
  email: string,
  password: string,
  role: 'owner' | 'barista' | 'customer' | 'admin'
}

export type CoffeeBatch = {
  id: `${string}-${string}-${string}-${string}-${string}`,
  type: string,
  harvestDate: string,
  quantity: number,
  origin?: string,
  description?: string;
  price?: number;
}

export type Order = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  userId: `${string}-${string}-${string}-${string}-${string}`; 
  coffeeType: string; 
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled'; 
  createdAt: string; 
}

export type Report = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  month: string; 
  totalProduction: number; 
  performanceMetrics: Record<string, any>; 
}
export type Database = {
  users: User[];
  coffee_inventory: CoffeeBatch[];
  orders: Order[];
  reports: Report[];
  storage_conditions: StorageCondition;
}

export type StorageCondition = {
  id: string;
  temperature: number; 
  humidity: number;    
  status: "optimal" | "risk" | "critical"; 
  monitoredAt: string; 
}
