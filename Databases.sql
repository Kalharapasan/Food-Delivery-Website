-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "cartData" JSONB DEFAULT '{}'::jsonb,
    role TEXT DEFAULT 'user'
);

-- Create Foods Table
CREATE TABLE foods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL
);

-- Create Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" UUID REFERENCES users(id) ON DELETE CASCADE,
    items JSONB NOT NULL,
    amount NUMERIC NOT NULL,
    address JSONB NOT NULL,
    status TEXT DEFAULT 'Food Processing',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payment BOOLEAN DEFAULT FALSE
);

-- Create Cart Items Table
CREATE TABLE cart_items (
    "userId" UUID REFERENCES users(id) ON DELETE CASCADE,
    "foodId" UUID REFERENCES foods(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY ("userId", "foodId")
);

-- Insert Default Admin (Password: admin1234)
-- Note: In production, it's safer to use the /api/user/admin/register route or seed.js
INSERT INTO users (name, email, password, role) 
VALUES ('Super Admin', 'admin@example.com', '$2b$10$32rJ7f.xYyO.o.5p0RTYX.d5K5qZc7A8V/6X/P1Y8D.4.O/X7qY.', 'admin')
ON CONFLICT (email) DO NOTHING;
