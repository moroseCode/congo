DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(5,2),
    stock_quantity INT
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Gamer PC', 'Computers', 999.99, 3),
('Gamer Keyboard', 'Peripherals', 79.99, 5),
('Gamer Mouse', 'Peripherals', 49.99, 5),
('Gaming Monitor', 'Monitors', 399.99, 1),
('Performance Mouse Pad', 'Peripherals', 29.99, 6),
('Studio Quality Headset', 'Headsets', 249.99, 4),
('Premium Webcam', 'Webcams', 99.99, 3),
('Premium Lighting', 'Lighting', 124.99, 2),
('Gamer Chair', 'Furniture', 299.99, 3),
('Mahogany Computer Desk', 'Furniture', 299.99, 1);