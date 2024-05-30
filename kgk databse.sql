CREATE DATABASE kgk;
USE kgk;

CREATE TABLE `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `role` VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `items`
(
    `item_id` INT AUTO_INCREMENT PRIMARY KEY,
    `item_name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `starting_price` DECIMAL(10, 2) NOT NULL,
    `current_price` DECIMAL(10, 2) DEFAULT NULL,
    `image_url` VARCHAR(255) NULL,
    `end_time` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `bids` (
    `bid_id` INT AUTO_INCREMENT PRIMARY KEY,
    `item_ref_id` INT,
    `user_ref_id` INT,
    `bid_amount` DECIMAL(10, 2) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_ref_id) REFERENCES items(item_id),
    FOREIGN KEY (user_ref_id) REFERENCES users(user_id)
); 

CREATE TABLE `notifications` (
    `notification_id` INT AUTO_INCREMENT PRIMARY KEY,
    `userID` INT,
    `message` VARCHAR(255) NOT NULL,
    `is_read` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(user_id)
);

