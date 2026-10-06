-- Add trial_days to products table
ALTER TABLE products ADD COLUMN trial_days integer NOT NULL DEFAULT 0;

-- Optional: Update existing products if you want them to have trials
-- UPDATE products SET trial_days = 7 WHERE slug = 'your-product-slug';
