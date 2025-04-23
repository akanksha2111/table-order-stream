import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem, menuItems } from "@/data/menuData";
import { mockTableOrders, mockBillHistory } from "@/data/mockOrders";
import { toast } from "sonner";

export interface TableOrder {
  id: number;
  items: OrderItem[];
  active: boolean;
  createdAt: Date;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface BillHistory {
  id: string;
  tableId: number;
  items: OrderItem[];
  total: number;
  tax: number;
  grandTotal: number;
  timestamp: Date;
}

interface RestaurantContextType {
  tables: TableOrder[];
  activeTableId: number | null;
  billHistory: BillHistory[];
  createTable: () => void;
  removeTable: (tableId: number) => void;
  setActiveTable: (tableId: number) => void;
  addItemToTable: (tableId: number, menuItem: MenuItem) => void;
  removeItemFromTable: (tableId: number, menuItemId: number) => void;
  updateItemQuantity: (tableId: number, menuItemId: number, quantity: number) => void;
  generateBill: (tableId: number) => BillHistory;
  resetTable: (tableId: number) => void;
  calculateTableTotal: (tableId: number) => { subtotal: number; tax: number; total: number };
  sendBillToWhatsApp: (bill: BillHistory, phoneNumber: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};

export const TAX_RATE = 0.05; // 5% tax

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tables, setTables] = useState<TableOrder[]>(mockTableOrders);
  const [activeTableId, setActiveTableId] = useState<number | null>(null);
  const [billHistory, setBillHistory] = useState<BillHistory[]>(mockBillHistory);
  
  // Load state from localStorage on mount
  useEffect(() => {
    const savedTables = localStorage.getItem("restaurant-tables");
    const savedBillHistory = localStorage.getItem("restaurant-billHistory");
    
    if (savedTables) {
      try {
        const parsedTables = JSON.parse(savedTables);
        // Convert string dates back to Date objects
        parsedTables.forEach((table: TableOrder) => {
          table.createdAt = new Date(table.createdAt);
        });
        setTables(parsedTables);
      } catch (error) {
        console.error("Failed to parse tables from localStorage:", error);
      }
    }
    
    if (savedBillHistory) {
      try {
        const parsedHistory = JSON.parse(savedBillHistory);
        // Convert string dates back to Date objects
        parsedHistory.forEach((bill: BillHistory) => {
          bill.timestamp = new Date(bill.timestamp);
        });
        setBillHistory(parsedHistory);
      } catch (error) {
        console.error("Failed to parse bill history from localStorage:", error);
      }
    }
  }, []);
  
  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("restaurant-tables", JSON.stringify(tables));
  }, [tables]);
  
  useEffect(() => {
    localStorage.setItem("restaurant-billHistory", JSON.stringify(billHistory));
  }, [billHistory]);
  
  const createTable = () => {
    const newTableId = tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1;
    const newTable: TableOrder = {
      id: newTableId,
      items: [],
      active: true,
      createdAt: new Date(),
    };
    
    setTables([...tables, newTable]);
    setActiveTableId(newTableId);
    toast.success(`Table ${newTableId} created`);
  };
  
  const removeTable = (tableId: number) => {
    setTables(tables.filter(table => table.id !== tableId));
    if (activeTableId === tableId) {
      setActiveTableId(null);
    }
    toast.success(`Table ${tableId} removed`);
  };
  
  const setActiveTable = (tableId: number) => {
    setActiveTableId(tableId);
  };
  
  const addItemToTable = (tableId: number, menuItem: MenuItem) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const existingItemIndex = table.items.findIndex(item => item.menuItem.id === menuItem.id);
        
        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          const updatedItems = [...table.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1
          };
          return { ...table, items: updatedItems };
        } else {
          // Add new item
          return {
            ...table,
            items: [...table.items, { menuItem, quantity: 1 }]
          };
        }
      }
      return table;
    }));
    
    toast.success(`Added ${menuItem.name} to Table ${tableId}`);
  };
  
  const removeItemFromTable = (tableId: number, menuItemId: number) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          items: table.items.filter(item => item.menuItem.id !== menuItemId)
        };
      }
      return table;
    }));
  };
  
  const updateItemQuantity = (tableId: number, menuItemId: number, quantity: number) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          items: table.items.map(item => {
            if (item.menuItem.id === menuItemId) {
              return { ...item, quantity };
            }
            return item;
          }).filter(item => item.quantity > 0) // Remove items with quantity 0
        };
      }
      return table;
    }));
  };
  
  const calculateTableTotal = (tableId: number) => {
    const table = tables.find(table => table.id === tableId);
    
    if (!table) {
      return { subtotal: 0, tax: 0, total: 0 };
    }
    
    const subtotal = table.items.reduce((sum, item) => {
      return sum + item.menuItem.price * item.quantity;
    }, 0);
    
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };
  
  const generateBill = (tableId: number) => {
    const table = tables.find(table => table.id === tableId);
    
    if (!table) {
      throw new Error(`Table ${tableId} not found`);
    }
    
    const { subtotal, tax, total } = calculateTableTotal(tableId);
    
    const bill: BillHistory = {
      id: `BILL-${Date.now()}`,
      tableId,
      items: [...table.items],
      total: subtotal,
      tax,
      grandTotal: total,
      timestamp: new Date(),
    };
    
    setBillHistory([bill, ...billHistory]);
    return bill;
  };
  
  const resetTable = (tableId: number) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        return { ...table, items: [] };
      }
      return table;
    }));
    toast.success(`Table ${tableId} has been reset`);
  };
  
  const sendBillToWhatsApp = (bill: BillHistory, phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    // Format the bill details for WhatsApp
    let message = `*BILL: ${bill.id}*\n`;
    message += `*Table:* ${bill.tableId}\n`;
    message += `*Date:* ${bill.timestamp.toLocaleString()}\n\n`;
    message += `*ORDERED ITEMS:*\n`;
    
    bill.items.forEach(item => {
      message += `${item.quantity}x ${item.menuItem.name} - ₹${(item.menuItem.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Subtotal:* ₹${bill.total.toFixed(2)}`;
    message += `\n*Tax (5%):* ₹${bill.tax.toFixed(2)}`;
    message += `\n*TOTAL:* ₹${bill.grandTotal.toFixed(2)}`;
    message += `\n\nThank you for dining with us!`;
    
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, "");
    
    // Open WhatsApp with the pre-filled message
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Bill sent to WhatsApp");
  };
  
  return (
    <RestaurantContext.Provider
      value={{
        tables,
        activeTableId,
        billHistory,
        createTable,
        removeTable,
        setActiveTable,
        addItemToTable,
        removeItemFromTable,
        updateItemQuantity,
        generateBill,
        resetTable,
        calculateTableTotal,
        sendBillToWhatsApp,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
