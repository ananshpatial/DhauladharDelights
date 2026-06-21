import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Food from "../models/Food.js";
import User from "../models/User.js";

dotenv.config();

const foods = [
  {
    name: "Himachali Siddu Platter",
    category: "Indian",
    price: 249,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    description: "Steamed wheat buns with ghee, chutney and slow-cooked rajma.",
    rating: 4.8
  },
  {
    name: "Tandoori Paneer Pizza",
    category: "Pizza",
    price: 329,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
    description: "Wood-fired crust, smoky paneer tikka, peppers and herb cheese.",
    rating: 4.7
  },
  {
    name: "Mountain Smash Burger",
    category: "Burger",
    price: 219,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    description: "Double patty burger with crisp greens, house sauce and cheddar.",
    rating: 4.6
  },
  {
    name: "Kangra Berry Cooler",
    category: "Drinks",
    price: 129,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
    description: "Sparkling berry drink with mint, lime and crushed ice.",
    rating: 4.5
  },
  {
    name: "Saffron Kulfi Sundae",
    category: "Dessert",
    price: 169,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
    description: "Creamy kulfi, pistachio crumble, rose syrup and cardamom cream.",
    rating: 4.9
  },
  {
    name: "Family Valley Combo",
    category: "Combo",
    price: 699,
    image: "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=80",
    description: "Pizza, burgers, drinks and dessert for a relaxed dinner spread.",
    rating: 4.8
  }
];

const seed = async () => {
  await connectDB();
  await Food.deleteMany({});
  await Food.insertMany(foods);

  const adminExists = await User.findOne({ email: "admin@dhauladhardelights.com" });
  if (!adminExists) {
    await User.create({
      name: "Dhauladhar Admin",
      email: "admin@dhauladhardelights.com",
      password: "admin123",
      role: "admin"
    });
  }

  console.log("Seeded foods and admin user");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
