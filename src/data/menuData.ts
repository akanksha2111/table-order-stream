export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: string;
}

export type MenuCategory = {
  id: string;
  name: string;
};

export const menuCategories: MenuCategory[] = [
  { id: "starters", name: "Starters" },
  { id: "indian", name: "Indian Main Course" },
  { id: "chinese", name: "Chinese Main Course" },
  { id: "continental", name: "Continental Main Course" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
];

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Vegetable Spring Rolls",
    category: "starters",
    description: "Crispy rolls filled with mixed vegetables",
    price: 180,
  },
  {
    id: 2,
    name: "Paneer Tikka",
    category: "starters",
    description: "Grilled cottage cheese marinated in spices",
    price: 220,
  },
  {
    id: 3,
    name: "Chicken Wings",
    category: "starters",
    description: "Crispy fried chicken wings with hot sauce",
    price: 280,
  },
  {
    id: 4,
    name: "Mushroom Bruschetta",
    category: "starters",
    description: "Toasted bread with sautéed mushrooms and herbs",
    price: 200,
  },

  // Indian Main Course
  {
    id: 5,
    name: "Butter Chicken",
    category: "indian",
    description: "Tender chicken in rich buttery tomato sauce",
    price: 350,
  },
  {
    id: 6,
    name: "Paneer Butter Masala",
    category: "indian",
    description: "Cottage cheese in creamy tomato gravy",
    price: 280,
  },
  {
    id: 7,
    name: "Dal Makhani",
    category: "indian",
    description: "Black lentils cooked with butter and cream",
    price: 220,
  },
  {
    id: 8,
    name: "Vegetable Biryani",
    category: "indian",
    description: "Fragrant rice with mixed vegetables and spices",
    price: 250,
  },
  {
    id: 9,
    name: "Naan",
    category: "indian",
    description: "Traditional Indian bread",
    price: 60,
  },

  // Chinese Main Course
  {
    id: 10,
    name: "Vegetable Hakka Noodles",
    category: "chinese",
    description: "Stir-fried noodles with mixed vegetables",
    price: 210,
  },
  {
    id: 11,
    name: "Sweet and Sour Vegetables",
    category: "chinese",
    description: "Crispy vegetables in tangy sauce",
    price: 240,
  },
  {
    id: 12,
    name: "Manchurian Fried Rice",
    category: "chinese",
    description: "Fried rice with vegetable balls in spicy sauce",
    price: 230,
  },
  {
    id: 13,
    name: "Szechuan Tofu",
    category: "chinese",
    description: "Tofu in spicy Szechuan sauce",
    price: 260,
  },

  // Continental Main Course
  {
    id: 14,
    name: "Margherita Pizza",
    category: "continental",
    description: "Classic pizza with tomato and mozzarella",
    price: 300,
  },
  {
    id: 15,
    name: "Pasta Alfredo",
    category: "continental",
    description: "Creamy pasta with parmesan sauce",
    price: 280,
  },
  {
    id: 16,
    name: "Grilled Vegetable Sandwich",
    category: "continental",
    description: "Toasted sandwich with grilled vegetables",
    price: 220,
  },
  {
    id: 17,
    name: "Caesar Salad",
    category: "continental",
    description: "Fresh lettuce with Caesar dressing",
    price: 250,
  },

  // Beverages
  {
    id: 18,
    name: "Fresh Lime Soda",
    category: "beverages",
    description: "Refreshing lime juice with soda",
    price: 80,
  },
  {
    id: 19,
    name: "Masala Chai",
    category: "beverages",
    description: "Spiced Indian tea",
    price: 60,
  },
  {
    id: 20,
    name: "Mango Smoothie",
    category: "beverages",
    description: "Thick mango smoothie with yogurt",
    price: 140,
  },
  {
    id: 21,
    name: "Iced Coffee",
    category: "beverages",
    description: "Chilled coffee with milk",
    price: 120,
  },

  // Desserts
  {
    id: 22,
    name: "Gulab Jamun",
    category: "desserts",
    description: "Sweet milk balls in sugar syrup",
    price: 140,
  },
  {
    id: 23,
    name: "Chocolate Brownie",
    category: "desserts",
    description: "Warm chocolate brownie with ice cream",
    price: 180,
  },
  {
    id: 24,
    name: "Tiramisu",
    category: "desserts",
    description: "Italian coffee-flavored dessert",
    price: 220,
  },
  {
    id: 25,
    name: "Fruit Custard",
    category: "desserts",
    description: "Mixed fruits in vanilla custard",
    price: 160,
  },
];
