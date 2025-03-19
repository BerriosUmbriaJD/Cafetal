import { create } from 'zustand';
import { db } from '@/db/db';
import { CoffeeBatch, Order, Report } from '@/types';

interface AdminState {
    coffeeInventory: CoffeeBatch[];
    orders: Order[];
    reports: Report[];
}

interface AdminActions {
    loadCoffeeInventory: () => void;
    addCoffeeBatch: (batch: Omit<CoffeeBatch, 'id'>) => void;
    deleteCoffeeBatch: (id: string) => void;

    loadOrders: () => void;
    updateOrderStatus: (id: string, status: Order["status"]) => void;
  deleteOrder: (id: string) => void;

    generateReport: (month: string) => void;
}

export const useAdminStore = create<AdminState & AdminActions>((set) => ({
    coffeeInventory: [],
    orders: [],
    reports: [],

    loadCoffeeInventory: () => {
        set({ coffeeInventory: db.getCoffeeInventory() });
    },

    addCoffeeBatch: (batch) => {
        const newBatch = { ...batch, id: crypto.randomUUID() };
        db.addCoffeeBatch(newBatch);
        set((state) => ({ coffeeInventory: [...state.coffeeInventory, newBatch] }));
    },

    deleteCoffeeBatch: (id) => {
        db.deleteCoffeeBatch(id);
        set((state) => ({
            coffeeInventory: state.coffeeInventory.filter((b) => b.id !== id),
        }));
    },

    loadOrders: () => {
        set({ orders: db.getOrders() });
    },

    deleteOrder: (id) => {
        db.deleteOrder(id);
        set({ orders: db.getOrders() });
      },

    updateOrderStatus: (id, status) => {
        db.updateOrderStatus(id, status);
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === id ? { ...order, status } : order
            ),
        }));
    },

    generateReport: (month) => {
        const inventory = db.getCoffeeInventory();
        const totalProduction = inventory.reduce((sum, batch) => sum + batch.quantity, 0);

        const report = {
            id: crypto.randomUUID(),
            month,
            totalProduction,
            performanceMetrics: {},
        };

        db.addReport(report);
        set((state) => ({ reports: [...state.reports, report] }));
    },
}));