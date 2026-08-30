-- ============================================================
-- Lux Pick Florence — MySQL Schema
-- Run this in your MySQL database before starting the app
-- ============================================================

CREATE DATABASE IF NOT EXISTS luxflorence;
USE luxflorence;

-- Products
CREATE TABLE IF NOT EXISTS products (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(255) NOT NULL UNIQUE,
  name         VARCHAR(255) NOT NULL,
  category     ENUM('Bags','Watches','Jewelry','Shoes','Accessories') NOT NULL,
  price        DECIMAL(10,2) NOT NULL,
  old_price    DECIMAL(10,2) NULL,
  rating       DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  description  TEXT,
  sku          VARCHAR(100),
  is_new       TINYINT(1) DEFAULT 0,
  is_best_seller TINYINT(1) DEFAULT 0,
  is_sale      TINYINT(1) DEFAULT 0,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Product Images (one-to-many)
CREATE TABLE IF NOT EXISTS product_images (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  url        VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Colors
CREATE TABLE IF NOT EXISTS product_colors (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  name       VARCHAR(100) NOT NULL,
  hex        VARCHAR(20) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Sizes
CREATE TABLE IF NOT EXISTS product_sizes (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  size       VARCHAR(50) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Specifications
CREATE TABLE IF NOT EXISTS product_specs (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  label      VARCHAR(100) NOT NULL,
  value      VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  author     VARCHAR(150) NOT NULL,
  rating     INT NOT NULL DEFAULT 5,
  date       DATE NOT NULL,
  title      VARCHAR(255),
  body       TEXT,
  verified   TINYINT(1) DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255),
  description TEXT,
  image_url   VARCHAR(500) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(200) NOT NULL,
  role       VARCHAR(200) NOT NULL,
  bio        TEXT,
  image_url  VARCHAR(500),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
