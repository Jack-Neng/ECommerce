CREATE DATABASE  IF NOT EXISTS "ecommerce";
USE "ecommerce";

CREATE TABLE "cart" (
  "cart_id" int NOT NULL,
  "product_id" int NOT NULL,
  "customer_id" int DEFAULT NULL,
  "qty" int DEFAULT NULL,
  PRIMARY KEY ("cart_id","product_id")
);

CREATE TABLE "customer" (
  "customer_id" bigint NOT NULL,
  "address" varchar(255) DEFAULT NULL,
  "city" varchar(255) DEFAULT NULL,
  "country" varchar(255) DEFAULT NULL,
  "email" varchar(255) DEFAULT NULL,
  "first_name" varchar(255) DEFAULT NULL,
  "last_name" varchar(255) DEFAULT NULL,
  "password" varchar(255) DEFAULT NULL,
  "phone" varchar(255) DEFAULT NULL,
  "postal_code" varchar(255) DEFAULT NULL,
  "state" varchar(255) DEFAULT NULL,
  PRIMARY KEY ("customer_id")
);

CREATE TABLE "product" (
  "product_id" int NOT NULL,
  "department" varchar(255) DEFAULT NULL,
  "img" varchar(255) DEFAULT NULL,
  "product_description" varchar(255) DEFAULT NULL,
  "product_name" varchar(255) DEFAULT NULL,
  "unit_price" DOUBLE PRECISION DEFAULT NULL,
  "cart_id" int DEFAULT NULL,
  PRIMARY KEY ("product_id"),
  UNIQUE ("cart_id","product_id"),
  CONSTRAINT fk_product_1 FOREIGN KEY ("cart_id", "product_id") REFERENCES "cart" ("cart_id", "product_id")
);

CREATE TABLE "role" (
  "role_id" bigint NOT NULL,
  "role_name" varchar(255) DEFAULT NULL,
  PRIMARY KEY ("role_id"),
  UNIQUE ("role_name")
);

CREATE TABLE "user_roles" (
  "customer_id" bigint NOT NULL,
  "role_id" bigint NOT NULL,
  PRIMARY KEY ("customer_id","role_id"),
  CONSTRAINT fk_user_roles_1 FOREIGN KEY ("role_id") REFERENCES "role" ("role_id"),
  CONSTRAINT fk_user_roles_2 FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id")
);

INSERT INTO "product" VALUES (100,'Grocery','https://picsum.photos/id/1/200/300','','Product A',20,NULL),(101,'Clothes','https://picsum.photos/id/2/200/300','','Product B',299.99,NULL),(102,'Clothes','https://picsum.photos/id/3/200/300','','Product C',100.5,NULL),(103,'Electronics','https://picsum.photos/id/4/200/300','','Product D',50,NULL),(104,'Home','https://picsum.photos/id/5/200/300','','Product E',39.99,NULL),(105,'Sports','https://picsum.photos/id/6/200/300','','Product F',25,NULL),(106,'Home','https://picsum.photos/id/7/200/300','','Product G',6,NULL),(107,'Sports','https://picsum.photos/id/8/200/300','','Product H',80,NULL),(108,'Clothes','https://picsum.photos/id/9/200/300','','Product I',105.69,NULL),(109,'Electronics','https://picsum.photos/id/10/200/300','','Product J',70,NULL),(110,'Grocery','https://picsum.photos/id/11/200/300','','Product K',27.3,NULL),(111,'Home','https://picsum.photos/id/12/200/300','','Product L',10.5,NULL),(112,'Grocery','https://picsum.photos/id/13/200/300','','Product M',100.5,NULL),(113,'Electronics','https://picsum.photos/id/14/200/300','','Product N',453.5,NULL),(114,'Home','https://picsum.photos/id/15/200/300','','Product O',59,NULL),(115,'Clothes','https://picsum.photos/id/16/200/300','','Product P',48,NULL),(116,'Home','https://picsum.photos/id/17/200/300','','Product Q',4,NULL),(117,'Sports','https://picsum.photos/id/18/200/300','','Product R',46.8,NULL),(118,'Clothes','https://picsum.photos/id/19/200/300','','Product S',45,NULL),(119,'Electronics','https://picsum.photos/id/20/200/300','','Product T',10.5,NULL),(120,'Grocery','https://picsum.photos/id/21/200/300','','Product U',9.99,NULL),(121,'Home','https://picsum.photos/id/22/200/300','','Product V',12,NULL),(122,'Grocery','https://picsum.photos/id/23/200/300','','Product W',28.6,NULL),(123,'Electronics','https://picsum.photos/id/24/200/300','','Product X',3,NULL),(124,'Home','https://picsum.photos/id/25/200/300','','Product Y',99.5,NULL),(125,'Clothes','https://picsum.photos/id/26/200/300','','Product Z',28,NULL);
UPDATE "product" SET product_description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at erat at justo mollis scelerisque. In lectus leo, vestibulum in posuere quis, pulvinar eget justo. Vivamus a velit sit amet augue iaculis mollis. Aenean nec quam a arcu dictum dignissim ac e';
