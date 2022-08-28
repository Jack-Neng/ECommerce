insert into role (role_name) values ('ROLE_USER');
insert into role (role_name) values ('ROLE_ADMIN');

INSERT INTO `ecommerce`.`clothes_product` (`product_id`, `size`, `colour`, `gender`) VALUES ('101', 'S', 'Blue', 'M');
INSERT INTO `ecommerce`.`clothes_product` (`product_id`, `size`, `colour`, `gender`) VALUES ('102', 'M', 'White', 'M');
INSERT INTO `ecommerce`.`clothes_product` (`product_id`, `size`, `colour`, `gender`) VALUES ('108', 'S', 'Green', 'U');
INSERT INTO `ecommerce`.`clothes_product` (`product_id`, `size`, `colour`, `gender`) VALUES ('115', 'L', 'Yellow', 'F');
INSERT INTO `ecommerce`.`clothes_product` (`product_id`, `size`, `colour`, `gender`) VALUES ('118', 'XL', 'Red', 'U');
INSERT INTO `ecommerce`.`clothes_product` (`product_id`, `size`, `colour`, `gender`) VALUES ('125', 'XS', 'Pink', 'F');

INSERT INTO `ecommerce`.`electronics_product` (`product_id`, `type`, `brand`) VALUES ('103', 'Phone', 'Apple');
INSERT INTO `ecommerce`.`electronics_product` (`product_id`, `type`, `brand`) VALUES ('109', 'Computer', 'Dell');
INSERT INTO `ecommerce`.`electronics_product` (`product_id`, `type`, `brand`) VALUES ('113', 'Fan', 'Dyson');
INSERT INTO `ecommerce`.`electronics_product` (`product_id`, `type`, `brand`) VALUES ('119', 'Phone', 'Samsung');
INSERT INTO `ecommerce`.`electronics_product` (`product_id`, `type`, `brand`) VALUES ('123', 'Air Fryer', 'Ninja');

INSERT INTO `ecommerce`.`grocery_product` (`product_id`, `type`) VALUES ('100', 'Meat');
INSERT INTO `ecommerce`.`grocery_product` (`product_id`, `type`) VALUES ('110', 'Juice');
INSERT INTO `ecommerce`.`grocery_product` (`product_id`, `type`) VALUES ('112', 'Fruit');
INSERT INTO `ecommerce`.`grocery_product` (`product_id`, `type`) VALUES ('120', 'Vegetable');
INSERT INTO `ecommerce`.`grocery_product` (`product_id`, `type`) VALUES ('122', 'Dairy');

INSERT INTO `ecommerce`.`home_product` (`product_id`, `location`, `type`) VALUES ('104', 'Kitchen', 'Fridge');
INSERT INTO `ecommerce`.`home_product` (`product_id`, `location`, `type`) VALUES ('106', 'Bathroom', 'Towel');
INSERT INTO `ecommerce`.`home_product` (`product_id`, `location`, `type`) VALUES ('111', 'Living', 'Table');
INSERT INTO `ecommerce`.`home_product` (`product_id`, `location`, `type`) VALUES ('114', 'Dining', 'Table');
INSERT INTO `ecommerce`.`home_product` (`product_id`, `location`, `type`) VALUES ('116', 'Bedroom', 'Pillow');
INSERT INTO `ecommerce`.`home_product` (`product_id`, `location`, `type`) VALUES ('121', 'Living', 'Chair');
INSERT INTO `ecommerce`.`home_product` (`product_id`, `location`, `type`) VALUES ('124', 'Bedroom', 'Lamp');

INSERT INTO `ecommerce`.`sports_product` (`product_id`, `type`) VALUES ('105', 'Badminton');
INSERT INTO `ecommerce`.`sports_product` (`product_id`, `type`) VALUES ('107', 'Swimming');
INSERT INTO `ecommerce`.`sports_product` (`product_id`, `type`, `size`) VALUES ('117', 'Hockey', 'S');
