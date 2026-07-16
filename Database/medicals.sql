use medicals;
show tables;
desc user ;
desc sale;
desc medicine;
desc supplier;
show databases;

create database medicals;
select * from user;

ALTER TABLE sale
ADD COLUMN user_id BIGINT;

ALTER TABLE sale
ADD CONSTRAINT fk_sale_user
FOREIGN KEY (user_id)
REFERENCES user(user_id);

SELECT supplier_id, supplier_name, user_id FROM supplier;

SELECT medicine_id, medicine_name, user_id FROM medicine;

SELECT sale_id, user_id FROM sale;

delete from sale where sale_id=2;
truncate table sale;



INSERT INTO supplier (supplier_name, phone, email, address, user_id) VALUES
('Apollo Pharma', '9876543210', 'apollo@gmail.com', 'Hyderabad', 1),
('MedLife Distributors', '9876543211', 'medlife@gmail.com', 'Vijayawada', 1),
('HealthCare Pharma', '9876543212', 'healthcare@gmail.com', 'Visakhapatnam', 1),
('Wellness Medicals', '9876543213', 'wellness@gmail.com', 'Guntur', 1),
('Sri Pharma', '9876543214', 'sripharma@gmail.com', 'Warangal', 1),
('Life Drugs', '9876543215', 'lifedrugs@gmail.com', 'Nellore', 1),
('Care Plus', '9876543216', 'careplus@gmail.com', 'Kurnool', 1),
('Sun Pharma Supply', '9876543217', 'sun@gmail.com', 'Kadapa', 1),
('Prime Medical Agency', '9876543218', 'prime@gmail.com', 'Anantapur', 1),
('Global Pharma', '9876543219', 'global@gmail.com', 'Rajahmundry', 1);

INSERT INTO supplier (supplier_name, phone, email, address, user_id) VALUES
('City Pharma', '9123456781', 'city@gmail.com', 'Hyderabad', 2),
('Green Medicals', '9123456782', 'green@gmail.com', 'Vizag', 2),
('Best Drugs', '9123456783', 'best@gmail.com', 'Guntur', 2),
('Life Care Pharma', '9123456784', 'lifecare@gmail.com', 'Kakinada', 2),
('Royal Medicals', '9123456785', 'royal@gmail.com', 'Ongole', 2);

INSERT INTO medicine
(medicine_name,category,batch_no,mfg_date,expiry_date,price,stock,supplier_id,user_id)
VALUES
('Amoxicillin','Antibiotic','AMX101','2026-01-10','2028-01-10',180,75,1,1),

('Ibuprofen','Tablet','IBU102','2026-02-05','2027-11-30',40,55,2,1),

('Cetirizine','Tablet','CET103','2026-01-20','2027-10-20',25,9,3,1),

('Pantoprazole','Capsule','PAN104','2026-03-15','2028-03-15',65,120,4,1),

('Metformin','Tablet','MET105','2026-01-01','2028-06-01',55,0,5,1),

('Aspirin','Tablet','ASP106','2025-11-10','2026-07-01',30,22,6,1),

('Omeprazole','Capsule','OME107','2026-02-18','2028-04-15',70,6,7,1),

('Insulin','Injection','INS108','2026-01-12','2027-08-01',420,15,8,1),

('Calcium Tablets','Supplement','CAL109','2026-03-01','2028-05-01',160,88,9,1),

('ORS Powder','Powder','ORS110','2026-02-15','2026-08-15',18,0,10,1);

INSERT INTO medicine
(medicine_name,category,batch_no,mfg_date,expiry_date,price,stock,supplier_id,user_id)
VALUES
('Diclofenac','Tablet','DIC201','2026-01-05','2027-09-01',45,30,11,2),

('Ranitidine','Tablet','RAN202','2026-02-10','2026-08-20',35,5,12,2),

('Cough Syrup','Syrup','COU203','2026-03-12','2028-02-10',90,18,13,2),

('Multivitamin','Vitamin','MUL204','2026-01-15','2028-07-01',140,0,14,2),

('Antacid Gel','Gel','ANT205','2026-02-01','2027-12-01',80,50,15,2);

INSERT INTO sale (sale_date,total_amount,status,user_id) VALUES
('2026-07-01',360,'ACTIVE',1),
('2026-07-02',120,'ACTIVE',1),
('2026-07-03',450,'ACTIVE',1),
('2026-07-04',220,'ACTIVE',1),
('2026-07-05',150,'CANCELLED',1),
('2026-07-06',95,'ACTIVE',1),
('2026-07-07',680,'ACTIVE',1),
('2026-07-08',310,'ACTIVE',1),
('2026-07-09',500,'ACTIVE',1),
('2026-07-10',210,'ACTIVE',1);

INSERT INTO sale (sale_date,total_amount,status,user_id) VALUES
('2026-07-02',180,'ACTIVE',2),
('2026-07-03',290,'ACTIVE',2),
('2026-07-04',420,'ACTIVE',2),
('2026-07-05',75,'CANCELLED',2),
('2026-07-06',560,'ACTIVE',2);


INSERT INTO sale_item (price,quantity,medicine_id,sale_id) VALUES

(180,2,1,1),
(40,3,2,2),
(65,4,4,3),
(55,4,5,4),
(30,5,6,5),
(25,2,3,6),
(420,1,8,7),
(160,2,9,8),
(70,3,7,9),
(18,10,10,10),

(45,4,11,11),
(35,5,12,12),
(90,3,13,13),
(140,1,14,14),
(80,7,15,15);

SELECT medicine_id, medicine_name FROM medicine;

INSERT INTO medicine
(medicine_id, medicine_name, category, batch_no, mfg_date, expiry_date, price, stock, supplier_id, user_id)
VALUES
(2,
'Ibuprofen',
'Tablet',
'IBU002',
'2026-02-10',
'2028-02-10',
45,
80,
1,
1);

SELECT * FROM sale_item WHERE sale_id = 1;
SELECT * FROM sale WHERE sale_id = 1;

UPDATE sale_item
SET medicine_id = 2
WHERE sale_item_id = 18;

UPDATE sale
SET total_amount = 390
WHERE sale_id = 1;

UPDATE sale
SET total_amount = 195
WHERE sale_id = 2;

UPDATE sale
SET total_amount = 480
WHERE sale_id = 13;

UPDATE sale
SET total_amount = 18
WHERE sale_id = 14;

UPDATE sale
SET total_amount = 315
WHERE sale_id = 15;

SELECT sale_id, user_id
FROM sale
ORDER BY sale_id;

SELECT *
FROM sale_item
WHERE sale_id IN (16,17);

SELECT medicine_id, medicine_name
FROM medicine
ORDER BY medicine_id;

INSERT INTO sale_item (price, quantity, medicine_id, sale_id)
VALUES
(50, 2, 13, 16),
(120, 1, 14, 17);

SELECT sale_id, user_id
FROM sale
ORDER BY sale_id;