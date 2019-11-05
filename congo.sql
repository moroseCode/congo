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
VALUES ('Gamer PC', 'Computers', 999.99, 10),
('Gamer Keyboard', 'Peripherals', 79.99, 30),
('Gamer Mouse', 'Peripherals', 49.99, 30),
('Gaming Monitor', 'Monitors', 399.99, 20),
('Performance Mouse Pad', 'Peripherals', 29.99, 40),
('Studio Quality Headset', 'Headsets', 249.99, 20),
('Premium Webcam', 'Webcams', 99.99, 40),
('Premium Lighting', 'Lighting', 124.99, 50),
('Gamer Chair', 'Furniture', 299.99, 15),
('Mahogany Computer Desk', 'Furniture', 299.99, 10);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'Password1';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password1';

SELECT * FROM products WHERE stock_quantity < 20;