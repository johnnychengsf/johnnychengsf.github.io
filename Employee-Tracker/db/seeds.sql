delete from employee;
delete from `role`;
delete from department;

Alter table department AUTO_INCREMENT = 1;
Alter table `role` AUTO_INCREMENT = 1;
Alter table employee AUTO_INCREMENT = 1;

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary)
VALUES ("Sales Lead", 100000),
         ("Salesperson", 80000),
         ("Lead Engineer", 150000),
         ("Software Engineer", 120000),
         ("Account Manager", 160000),
         ("Accountant", 125000),
         ("Legal Team Lead", 250000),
         ("Lawyer", 190000);

INSERT INTO employee (first_name, last_name)
VALUES ("John", "Doe"),
         ("Mike", "Chan"),
         ("Ashley", "Rodriguez"),
         ("Kevin", "Tupik"),
         ("Kunal", "Singh"),
         ("Malia", "Brown"),
         ("Sarah", "Lourd"),
         ("Tom", "Allen");