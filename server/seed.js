import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(
  process.env.SUPABASE_URL,
  supabaseKey
);

const food_list = [
    { name: "Greek salad", image: "Img (1).png", price: 12, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Veg salad", image: "Img (2).png", price: 18, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Clover Salad", image: "Img (3).png", price: 16, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Chicken Salad", image: "Img (4).png", price: 24, category: "Salad", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Lasagna Rolls", image: "Img (5).png", price: 14, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Peri Peri Rolls", image: "Img (6).png", price: 12, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Chicken Rolls", image: "Img (7).png", price: 20, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Veg Rolls", image: "Img (8).png", price: 15, category: "Rolls", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Ripple Ice Cream", image: "Img (9).png", price: 14, category: "Deserts", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Fruit Ice Cream", image: "Img (10).png", price: 22, category: "Deserts", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Jar Ice Cream", image: "Img (11).png", price: 10, category: "Deserts", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Vanilla Ice Cream", image: "Img (12).png", price: 12, category: "Deserts", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Chicken Sandwich", image: "Img (13).png", price: 12, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Vegan Sandwich", image: "Img (14).png", price: 18, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Grilled Sandwich", image: "Img (15).png", price: 16, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Bread Sandwich", image: "Img (16).png", price: 24, category: "Sandwich", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Cup Cake", image: "Img (17).png", price: 14, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Vegan Cake", image: "Img (18).png", price: 12, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Butterscotch Cake", image: "Img (19).png", price: 20, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Sliced Cake", image: "Img (20).png", price: 15, category: "Cake", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Garlic Mushroom ", image: "Img (21).png", price: 14, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Fried Cauliflower", image: "Img (22).png", price: 22, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Mix Veg Pulao", image: "Img (23).png", price: 10, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Rice Zucchini", image: "Img (24).png", price: 12, category: "Pure Veg", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Cheese Pasta", image: "Img (25).png", price: 12, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Tomato Pasta", image: "Img (26).png", price: 18, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Creamy Pasta", image: "Img (27).png", price: 16, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Chicken Pasta", image: "Img (28).png", price: 24, category: "Pasta", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Buttter Noodles", image: "Img (29).png", price: 14, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Veg Noodles", image: "Img (30).png", price: 12, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Somen Noodles", image: "Img (31).png", price: 20, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" },
    { name: "Cooked Noodles", image: "Img (32).png", price: 15, category: "Noodles", description: "Food provides essential nutrients for overall health and well-being" }
];

const seedDatabase = async () => {
  if (!process.env.SUPABASE_URL || !supabaseKey) {
    console.error("Error: Missing SUPABASE_URL or a Supabase API key in your .env file!");
    process.exit(1);
    return;
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Error: SUPABASE_SERVICE_ROLE_KEY is required to seed because row-level security blocks anon inserts.");
    process.exit(1);
      return;
  }

  console.log("Starting database seed...");
  let hadErrors = false;

  // Seed Admin User
  console.log("Seeding default admin user...");
  const adminEmail = "admin@example.com";
  const { data: existingAdmin } = await supabase.from('users').select('id').eq('email', adminEmail).maybeSingle();

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin1234", salt);
    const { error: adminError } = await supabase.from('users').insert([{
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      "cartData": {}
    }]);

    if (adminError) {
      console.error("❌ Error creating admin user:", adminError.message);
      hadErrors = true;
    } else {
      console.log("✅ Created default admin user (admin@example.com / admin1234)");
    }
  } else {
    console.log("⚠️ Default admin user already exists.");
  }
  
  console.log("Inserting", food_list.length, "food items...");
  for (const food of food_list) {
    const { data: existingFood } = await supabase.from('foods').select('id').eq('name', food.name).maybeSingle();
      // Seed dummy cart data
  console.log("Seeding dummy cart data...");
  const dummyCart = {
    user_id: adminEmail, // using admin email as identifier
    items: JSON.stringify(food_list.slice(0, 3).map(f => ({ food_id: f.name, quantity: 1 }))),
    total: food_list.slice(0, 3).reduce((sum, f) => sum + f.price, 0),
    status: "active",
  };
  const { error: cartError } = await supabase.from('carts').insert([dummyCart]);
  if (cartError) {
    console.error("❌ Error inserting dummy cart:", cartError.message);
    hadErrors = true;
  } else {
    console.log("✅ Inserted dummy cart for admin user");
  }

  // Seed dummy order data
  console.log("Seeding dummy order data...");
  const dummyOrder = {
    user_id: adminEmail,
    items: JSON.stringify(food_list.slice(0, 3).map(f => ({ food_id: f.name, quantity: 1 }))),
    total: food_list.slice(0, 3).reduce((sum, f) => sum + f.price, 0),
    status: "pending",
    created_at: new Date().toISOString(),
  };
  const { error: orderError } = await supabase.from('orders').insert([dummyOrder]);
  if (orderError) {
    console.error("❌ Error inserting dummy order:", orderError.message);
    hadErrors = true;
  } else {
    console.log("✅ Inserted dummy order for admin user");
  }

  if (hadErrors) {
    console.error("Seed finished with errors. Fix the Supabase credentials/policies and run it again.");
    process.exit(1);
  }

  console.log("🎉 Database seed complete!");
  process.exit(0);
};

seedDatabase();
