
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
  { id: "indian", name: "Indian" },
  { id: "chinese", name: "Chinese" },
  { id: "continental", name: "Continental" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
];

export const menuItems: MenuItem[] = [
  // Indian
  {
    id: 1,
    name: "Butter Chicken",
    category: "indian",
    description: "Tender chicken in a rich buttery tomato sauce",
    price: 350,
  },
  {
    id: 2,
    name: "Paneer Tikka Masala",
    category: "indian",
    description: "Grilled cottage cheese in a spicy tomato gravy",
    price: 280,
  },
  {
    id: 3,
    name: "Dal Makhani",
    category: "indian",
    description: "Black lentils cooked with butter and cream",
    price: 220,
  },
  {
    id: 4,
    name: "Naan",
    category: "indian",
    description: "Traditional Indian bread baked in tandoor",
    price: 60,
  },
  {
    id: 5,
    name: "Biryani",
    category: "indian",
    description: "Fragrant rice dish with spices and meat or vegetables",
    price: 320,
  },
  
  // Chinese
  {
    id: 6,
    name: "Kung Pao Chicken",
    category: "chinese",
    description: "Spicy stir-fried chicken with peanuts and vegetables",
    price: 290,
  },
  {
    id: 7,
    name: "Vegetable Hakka Noodles",
    category: "chinese",
    description: "Stir-fried noodles with mixed vegetables",
    price: 210,
  },
  {
    id: 8,
    name: "Sweet and Sour Pork",
    category: "chinese",
    description: "Crispy pork pieces with a tangy sweet and sour sauce",
    price: 320,
  },
  {
    id: 9,
    name: "Veg Spring Rolls",
    category: "chinese",
    description: "Crispy fried rolls with vegetable filling",
    price: 180,
  },
  {
    id: 10,
    name: "Fried Rice",
    category: "chinese",
    description: "Stir-fried rice with eggs and vegetables",
    price: 220,
  },
  
  // Continental
  {
    id: 11,
    name: "Classic Margherita Pizza",
    category: "continental",
    description: "Tomato, mozzarella, and basil on a thin crust",
    price: 300,
  },
  {
    id: 12,
    name: "Spaghetti Carbonara",
    category: "continental",
    description: "Pasta with creamy egg sauce, pancetta, and black pepper",
    price: 320,
  },
  {
    id: 13,
    name: "Grilled Salmon",
    category: "continental",
    description: "Fresh salmon fillet with herbs and lemon",
    price: 420,
  },
  {
    id: 14,
    name: "Caesar Salad",
    category: "continental",
    description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 250,
  },
  {
    id: 15,
    name: "Mushroom Risotto",
    category: "continental",
    description: "Creamy Italian rice dish with mushrooms and parmesan",
    price: 280,
  },
  
  // Beverages
  {
    id: 16,
    name: "Fresh Lime Soda",
    category: "beverages",
    description: "Refreshing lime juice with soda water",
    price: 80,
  },
  {
    id: 17,
    name: "Masala Chai",
    category: "beverages",
    description: "Spiced Indian tea with milk",
    price: 60,
  },
  {
    id: 18,
    name: "Classic Mojito",
    category: "beverages",
    description: "Refreshing mint and lime mocktail",
    price: 150,
  },
  {
    id: 19,
    name: "Mango Smoothie",
    category: "beverages",
    description: "Thick smoothie made with fresh mangoes and yogurt",
    price: 140,
  },
  {
    id: 20,
    name: "Fresh Orange Juice",
    category: "beverages",
    description: "Freshly squeezed orange juice",
    price: 120,
  },
  
  // Desserts
  {
    id: 21,
    name: "Gulab Jamun",
    category: "desserts",
    description: "Deep-fried milk solids soaked in sugar syrup",
    price: 140,
  },
  {
    id: 22,
    name: "Chocolate Brownie with Ice Cream",
    category: "desserts",
    description: "Warm chocolate brownie served with vanilla ice cream",
    price: 180,
  },
  {
    id: 23,
    name: "Tiramisu",
    category: "desserts",
    description: "Italian coffee-flavored dessert with mascarpone cheese",
    price: 220,
  },
  {
    id: 24,
    name: "Cheesecake",
    category: "desserts",
    description: "New York style cheesecake with berry compote",
    price: 190,
  },
  {
    id: 25,
    name: "Rasmalai",
    category: "desserts",
    description: "Soft cottage cheese dumplings in sweetened milk",
    price: 160,
  },
];
