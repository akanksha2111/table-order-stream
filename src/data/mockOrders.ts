import { MenuItem, menuItems } from "./menuData";
import { TableOrder, BillHistory } from "@/contexts/RestaurantContext";

// Helper function to get a random menu item
const getRandomMenuItem = (): MenuItem => {
  const randomIndex = Math.floor(Math.random() * menuItems.length);
  return menuItems[randomIndex];
};

// Helper function to get a random quantity between 1 and 3
const getRandomQuantity = (): number => Math.floor(Math.random() * 3) + 1;

// Generate mock table orders
export const mockTableOrders: TableOrder[] = [
  {
    id: 1,
    items: [
      { menuItem: menuItems[0], quantity: 2 }, // Butter Chicken
      { menuItem: menuItems[3], quantity: 4 }, // Naan
      { menuItem: menuItems[16], quantity: 2 }, // Fresh Lime Soda
    ],
    active: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    items: [
      { menuItem: menuItems[6], quantity: 2 }, // Vegetable Hakka Noodles
      { menuItem: menuItems[8], quantity: 1 }, // Veg Spring Rolls
      { menuItem: menuItems[17], quantity: 2 }, // Masala Chai
    ],
    active: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    items: [
      { menuItem: menuItems[11], quantity: 1 }, // Classic Margherita Pizza
      { menuItem: menuItems[13], quantity: 1 }, // Caesar Salad
      { menuItem: menuItems[18], quantity: 2 }, // Classic Mojito
      { menuItem: menuItems[22], quantity: 1 }, // Chocolate Brownie with Ice Cream
    ],
    active: true,
    createdAt: new Date(),
  },
];

// Generate mock bill history
export const mockBillHistory: BillHistory[] = [
  {
    id: "bill-1",
    tableId: 1,
    items: [
      { menuItem: menuItems[1], quantity: 2 }, // Paneer Tikka Masala
      { menuItem: menuItems[4], quantity: 3 }, // Naan
      { menuItem: menuItems[19], quantity: 2 }, // Mango Smoothie
    ],
    total: 1160,
    tax: 58,
    grandTotal: 1218,
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "bill-2",
    tableId: 2,
    items: [
      { menuItem: menuItems[5], quantity: 1 }, // Biryani
      { menuItem: menuItems[7], quantity: 1 }, // Sweet and Sour Pork
      { menuItem: menuItems[20], quantity: 2 }, // Fresh Orange Juice
    ],
    total: 960,
    tax: 48,
    grandTotal: 1008,
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
  },
  {
    id: "bill-3",
    tableId: 3,
    items: [
      { menuItem: menuItems[12], quantity: 1 }, // Spaghetti Carbonara
      { menuItem: menuItems[14], quantity: 1 }, // Mushroom Risotto
      { menuItem: menuItems[23], quantity: 1 }, // Tiramisu
    ],
    total: 820,
    tax: 41,
    grandTotal: 861,
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
  },
]; 