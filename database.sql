-- -------------------------------------------------------------
-- 服务监控 - 数据库初始化脚本
-- -------------------------------------------------------------
-- 本脚本将执行以下操作:
-- 1. 如果 'service_monitor' 数据库不存在，则创建它。
-- 2. 创建应用程序所需的 'services' 表。
--
-- 如何使用此脚本:
-- 1. 确保您的 MySQL 服务器正在运行。
-- 2. 使用客户端（例如 MySQL 命令行、MySQL Workbench）连接到您的 MySQL 服务器。
-- 3. 将此文件的内容作为查询运行。
--    使用 MySQL 命令行示例:
--    mysql -u 您的用户名 -p < database.sql
-- -------------------------------------------------------------

-- 如果数据库不存在，则创建它
CREATE DATABASE IF NOT EXISTS `service_monitor`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- 切换到新创建的数据库
USE `service_monitor`;

-- 如果表已存在，则删除它以便重新开始（可选，适合开发环境）
DROP TABLE IF EXISTS `services`;

-- 创建 'services' 表
CREATE TABLE `services` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `vendor` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100),
    `start_date` DATE,
    `expiry_date` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_expiry_date` (`expiry_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 您可以在下方添加一些初始数据用于测试
-- 示例:
/*
INSERT INTO `services` (vendor, name, category, start_date, expiry_date) VALUES
('Cloudflare', 'Pro Plan', 'CDN & Security', '2023-01-15', '2024-01-15'),
('GitHub', 'Pro Subscription', 'Development', '2023-02-01', '2024-02-01'),
('DigitalOcean', 'Droplet', 'Hosting', '2023-05-20', '2024-05-20');
*/

-- --- 脚本结束 ---
