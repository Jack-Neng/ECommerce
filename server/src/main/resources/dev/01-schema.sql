CREATE TABLE `cart_ref` (
  `cart_ref_id` int NOT NULL AUTO_INCREMENT,
  `cart_uuid` char(36) NOT NULL,
  PRIMARY KEY (`cart_ref_id`)
);

CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `cart_ref` int NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`cart_id`)
);

CREATE TABLE `customer` (
  `customer_id`   bigint NOT NULL AUTO_INCREMENT,
  `customer_uuid` char(36) NOT NULL,
  `email`         varchar(128) NOT NULL,
  `password`      varchar(255) NOT NULL,
  `first_name`    varchar(36) NOT NULL,
  `last_name`     varchar(36) NOT NULL,
  `address`       varchar(128) DEFAULT NULL,
  `city`          varchar(36) DEFAULT NULL,
  `postal_code`   varchar(8) DEFAULT NULL,
  `state`         varchar(36) DEFAULT NULL,
  `country`       varchar(36) DEFAULT NULL,
  `phone`         varchar(20) DEFAULT NULL,
  `cart_ref`      int NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_UNIQUE_1` (`email`),
  UNIQUE KEY `customer_UNIQUE_2` (`customer_uuid`),
  UNIQUE KEY `customer_UNIQUE_3` (`cart_ref`)
);

CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_uuid` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `unit_price` double NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_uuid_UNIQUE` (`product_uuid`)
);
CREATE TABLE `order_ref` (
  `order_ref_id` int NOT NULL AUTO_INCREMENT,
  `order_uuid` char(36) NOT NULL,
  `customer_id` int NOT NULL,
  `shipment_id` int NOT NULL,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(128),
  `total_price` double NOT NULL,
  PRIMARY KEY (`order_ref_id`)
);

CREATE TABLE `order_item` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_ref` int NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  `shipped_date` datetime NOT NULL,
  `status` char(1) NOT NULL,
  PRIMARY KEY (`order_id`)
);

CREATE TABLE `shipment` (
  `shipment_id` int NOT NULL AUTO_INCREMENT,
  `shipment_uuid` char(36) NOT NULL,
  `first_name`    varchar(45) DEFAULT NULL,
  `last_name`     varchar(45) DEFAULT NULL,
  `address`       varchar(128) DEFAULT NULL,
  `city`          varchar(36) DEFAULT NULL,
  `postal_code`   varchar(8) DEFAULT NULL,
  `state`         varchar(36) DEFAULT NULL,
  `country`       varchar(36) DEFAULT NULL,
  `phone`         varchar(20) DEFAULT NULL,
  PRIMARY KEY (`shipment_id`)
);


CREATE TABLE `favourite` (
  `favourite_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`favourite_id`)
);


CREATE TABLE `role` (
  `role_id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name_UNIQUE` (`role_name`)
);

CREATE TABLE `user_roles` (
  `customer_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`customer_id`,`role_id`),
  CONSTRAINT `user_roles_FK_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `user_roles_FK_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
);

CREATE TABLE `clothes_product` (
  `product_id` INT NOT NULL,
  `size` ENUM('XS', 'S', 'M', 'L', 'XL') NULL,
  `colour` VARCHAR(10) NULL,
  `gender` ENUM('M', 'F', 'U') NOT NULL DEFAULT 'U',
  PRIMARY KEY (`product_id`),
  CONSTRAINT `clothes_product_FK_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `ecommerce`.`product` (`product_id`)
);

CREATE TABLE `electronics_product` (
  `product_id` INT NOT NULL,
  `type` VARCHAR(10) NULL,
  `brand` VARCHAR(10) NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `electronics_product_FK_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`product_id`)
);

CREATE TABLE `grocery_product` (
  `product_id` INT NOT NULL,
  `type` VARCHAR(10) NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `grocery_product_FK_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`product_id`)
);

CREATE TABLE `home_product` (
  `product_id` INT NOT NULL,
  `location` VARCHAR(10) NULL,
  `type` VARCHAR(10) NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `home_product_FK_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`product_id`)
);

CREATE TABLE `sports_product` (
  `product_id` INT NOT NULL,
  `type` VARCHAR(10) NULL,
  `size` VARCHAR(10) NULL,
  PRIMARY KEY (`product_id`),
  CONSTRAINT `sports_product_FK_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`product_id`)
);
