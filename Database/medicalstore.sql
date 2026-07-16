create database medicalstore;
use medicalstore;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    role varchar(100)
);
drop table users;
INSERT INTO users(username,password,role)
VALUES('admin','admin123','ADMIN');

show databases;
show tables;
select * from medicine;
SELECT * FROM supplier;
SELECT * FROM sale;
SELECT * FROM user;
SELECT * FROM users;
desc medicine;
desc sale;
desc sale_item;
desc supplier;
desc user;
