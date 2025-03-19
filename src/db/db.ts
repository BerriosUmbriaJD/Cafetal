import { Database, User, CoffeeBatch, Order, Report, StorageCondition } from '@/types';

const DB_NAME: string = 'cafeAppDB';

const initializeDB = (): void => {
  if (!localStorage.getItem(DB_NAME)) {
      const owner: User = { id: crypto.randomUUID(), username: "carlos", email: "owner@example.com", password: "123456789", role: "owner" };
      const barista: User = { id: crypto.randomUUID(), username: "maria", email: "barista@example.com", password: "123456789", role: "barista" };
      const customer: User = { id: crypto.randomUUID(), username: "juan", email: "customer@example.com", password: "123456789", role: "customer" };

      const arabica: CoffeeBatch = { id: crypto.randomUUID(), type: "Arábica", harvestDate: "2023-01-15", quantity: 50, origin: "Colombia", description: "Café de alta calidad", price: 40 };
      const robusta: CoffeeBatch = { id: crypto.randomUUID(), type: "Robusta", harvestDate: "2023-03-10", quantity: 30, origin: "Vietnam", description: "Café fuerte y amargo", price: 30 };
      const excelsa: CoffeeBatch = { id: crypto.randomUUID(), type: "Excelsa", harvestDate: "2023-05-20", quantity: 20, origin: "Brasil", description: "Café con notas afrutadas", price: 25 };
      const orders: Order[] = [
          { id: crypto.randomUUID(), userId: customer.id, coffeeType: "Arábica", quantity: 5, status: "pending", createdAt: "2023-10-01T10:00:00Z" },
          { id: crypto.randomUUID(), userId: customer.id, coffeeType: "Robusta", quantity: 10, status: "completed", createdAt: "2023-10-02T12:30:00Z" },
          { id: crypto.randomUUID(), userId: customer.id, coffeeType: "Excelsa", quantity: 3, status: "cancelled", createdAt: "2023-10-03T15:45:00Z" },
      ];

      const reports: Report[] = [
          { id: crypto.randomUUID(), month: "2023-09", totalProduction: 100, performanceMetrics: {} },
          { id: crypto.randomUUID(), month: "2023-08", totalProduction: 120, performanceMetrics: {} },
      ];

      const storage_conditions: StorageCondition = 
        {
          id: crypto.randomUUID(),
          temperature: 22,
          humidity: 60,
          status: "optimal",
          monitoredAt: "2025-03-18T10:00:00Z",
        }

      const initialData: Database = {
          users: [owner, barista, customer],
          coffee_inventory: [arabica, robusta, excelsa],
          orders,
          reports,
          storage_conditions
      };

      localStorage.setItem(DB_NAME, JSON.stringify(initialData));
  }
};


const getDB = (): Database => {
    const db = localStorage.getItem(DB_NAME);
    if (!db) throw new Error('La base de datos no está inicializada');
    return JSON.parse(db) as Database;
};


const saveDB = (data: Database): void => {
    localStorage.setItem(DB_NAME, JSON.stringify(data));
};

initializeDB(); 


export const db = {
    getUsers: (): Database['users'] => getDB().users,

    getCurrentUser: (): User | undefined => {
        const db = getDB();
        const userId = localStorage.getItem("currentUserId");
        return db.users.find((user) => user.id === userId);
      },

    addUser: (user: User): void => {
        const db = getDB();
        db.users.push(user);
        saveDB(db);
    },

    updateUser: (id: string, updates: Partial<User>): void => {
        const db = getDB();
        db.users = db.users.map((user) =>
          user.id === id ? { ...user, ...updates } : user
        );
        saveDB(db);
      },
    
    deleteUser: (id: string): void => {
        const db = getDB();
        db.users = db.users.filter((user) => user.id !== id);
        saveDB(db);
    },

    getCoffeeInventory: (): Database['coffee_inventory'] => getDB().coffee_inventory,

    addCoffeeBatch: (batch: CoffeeBatch): void => {
        const db = getDB();
        db.coffee_inventory.push(batch);
        saveDB(db);
    },

    deleteCoffeeBatch: (id: string): void => {
        const db = getDB();
        db.coffee_inventory = db.coffee_inventory.filter((batch) => batch.id !== id);
        saveDB(db);
    },

    updateCoffeeBatch: (id: string, updatedBatch: CoffeeBatch): void => {
        const db = getDB();
        db.coffee_inventory = db.coffee_inventory.map((batch) =>
          batch.id === id ? { ...batch, ...updatedBatch } : batch
        );
        saveDB(db);
      },

    getOrders: (): Database['orders'] => getDB().orders,

    addOrder: (order: Order): void => {
        const db = getDB();
        db.orders.push(order);
        saveDB(db);
    },

    updateOrderStatus: (id: string, status: Order['status']): void => {
        const db = getDB();
        db.orders = db.orders.map((order) =>
            order.id === id ? { ...order, status } : order
        );
        saveDB(db);
    },

    deleteOrder: (id: string): void => {
        const db = getDB();
        db.orders = db.orders.filter((order) => order.id !== id);
        saveDB(db);
      },

    getReports: (): Database['reports'] => getDB().reports,

    addReport: (report: Report): void => {
        const db = getDB();
        db.reports.push(report);
        saveDB(db);
    },

    getStorageConditions: (): StorageCondition => {
        const db = getDB();
        return db.storage_conditions;
      },
    getDB,
    updateOrder: (updatedOrder: Partial<Order>): void => {
        const db = getDB();
        db.orders = db.orders.map((order) =>
          order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
        );
        saveDB(db);
      },

    updateCoffeePrice: (id: string, newPrice: number): void => {
        const db = getDB();
        db.coffee_inventory = db.coffee_inventory.map((batch) =>
          batch.id === id ? { ...batch, pricePerKg: newPrice } : batch
        );
        saveDB(db);
      },
};