import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
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
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      console.error("Error: Missing SUPABASE_URL or SUPABASE_ANON_KEY in your .env file!");
      return;
  }

  console.log("Starting database seed...");

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
    } else {
      console.log("✅ Created default admin user (admin@example.com / admin1234)");
    }
  } else {
    console.log("⚠️ Default admin user already exists.");
  }
  
  console.log("Inserting", food_list.length, "food items...");
  for (const food of food_list) {
    const { data: existingFood } = await supabase.from('foods').select('id').eq('name', food.name).maybeSingle();
    
    if (!existingFood) {
      const { data, error } = await supabase.from('foods').insert([food]);
      if (error) {
        console.error(`❌ Error inserting ${food.name}:`, error.message);
      } else {
        console.log(`✅ Inserted: ${food.name}`);
      }
    } else {
      console.log(`⚠️ Skipped: ${food.name} (already exists)`);
    }
  }
  
  console.log("🎉 Database seed complete!");
  process.exit();
};

seedDatabase();
