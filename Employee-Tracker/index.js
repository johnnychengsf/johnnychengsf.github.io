require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
var fs = require('fs');
require('console.table');

var events = require('events');
process.env.NODE_NO_WARNINGS = 1;

let buffer = "";

let sqlAction = "";
let vAction = "";

const db = {host: 'localhost',
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            database: 'company_db',
            multipleStatements: true,
            waitForConnections: true,
            connectionLimit: 1024
         };
/*

Declare Menu

*/
const menuList = {
      name: 'sAction',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View Employees by Manager', 'View Employees by Department', 'Add Employee', 'Update Employee Role', 'Update Employee Manager', 'Delete Employee', 'View All Roles', 'Add Role', 'Delete Role', 'View All Departments', 'Add Department', 'Delete Department', 'Budget of Department', 'Quit']
   };

const ViewEmployeesbyManager = [
      {
         name: 'manager',
         type: 'list',
         message: 'Please select manager',
         choices: []
      }
   ];
const ViewEmployeesbyDepartment = [
      {
         name: 'name',
         type: 'list',
         message: 'Please select department',
         choices: []
      }
   ];
const DeleteEmployee = {
   name: 'employee',
   type: 'list',
   message: 'Please select employee',
   choices: []
}

const DeleteRole = {
   name: 'title',
   type: 'list',
   message: 'Please select title',
   choices: []
}

const DeleteDepartment = {
   name: 'department',
   type: 'list',
   message: 'Please select department',
   choices: []
}

const AddDepartment = {
      name: 'department',
      type: 'input',
      message: 'What is the name of the department?'
   };
   
const AddRole = [
      {
         name: 'title',
         type: 'input',
         message: 'What is the name of the role?'
      },{
         name: 'salary',
         type: 'input',
         message: 'What is the salary of the role?'
      },{
         name: 'department',
         type: 'list',
         message: 'Which department does the role belong to?',
         choices: []
      }
   ];

const AddEmployee = [
      {
         name: 'first_name',
         type: 'input',
         message: 'What is the employee\'s first name?'
      },{
         name: 'last_name',
         type: 'input',
         message: 'What is the employee\'s last name?'
      },{
         name: 'role',
         type: 'list',
         message: 'Which department does the role belong to?',
         choices: []
      },{
         name: 'manager',
         type: 'list',
         message: 'Who is the employee\'s manager?',
         choices: ['']
      }
   ];

const UpdateEmployeeManager = [
      {
         name: 'employee',
         type: 'list',
         message: 'Which employee\'s manager do you want to update?',
         choices: []
      },{
         name: 'manager',
         type: 'list',
         message: 'Which manager does the employee belong to?',
         choices: []
      }
   ];
const UpdateEmployeeRole = [
      {
         name: 'employee',
         type: 'list',
         message: 'Which employee\'s role do you want to update?',
         choices: []
      },{
         name: 'role',
         type: 'list',
         message: 'Which department does the role belong to?',
         choices: []
      }
   ];
/*

clear screen and set cursor to x=0, y=0

*/
let setCur = () => {
   console.log('\u001b[0;0H');
}

let clearCur = () => {
   console.log('\033[2J');
}

/*

callback function

*/

function fView(rows) {
   clearCur();setCur();
   console.log("");
   console.table(rows);
   menu(menuList);
}

async function fViewEmployeesByManager(rows) {
   ViewEmployeesbyManager[0].choices = [];

   for (let i in rows) {
      ViewEmployeesbyManager[0].choices.push(await (rows[i].first_name + ' ' + rows[i].last_name));
   }

   clearCur();setCur();
   menu(ViewEmployeesbyManager);
}

async function fViewEmployeesByDepartment(rows) {
   ViewEmployeesbyDepartment[0].choices = [];

   for (let i in rows) {
      ViewEmployeesbyDepartment[0].choices.push(await rows[i].name);
   }

   clearCur();setCur();
   menu(ViewEmployeesbyDepartment);
}

async function fAddRole(rows) {
   clearCur();setCur();
   AddRole[2].choices = [''];
   for (let i in rows) {
      AddRole[2].choices.push(await rows[i].name);
   }
   if (AddRole[2].choices.length > 1) {
      AddRole[2].choices.shift();
   }
   menu(AddRole);
}

async function fDeleteEmployee(rows) {
   clearCur();setCur();
   DeleteEmployee.choices = [];

   for (let i in rows) {
      DeleteEmployee.choices.push(await (rows[i].first_name + " " + rows[i].last_name));
   }
   
   menu(DeleteEmployee);
}
async function fDeleteRole(rows) {
   DeleteRole.choices = [];

   for (let i in rows) {
      DeleteRole.choices.push(await rows[i].title);
   }
   
   menu(DeleteRole);
}

async function fDeleteDepartment(rows) {
   clearCur();setCur();
   DeleteDepartment.choices = [];

   for (let i in rows) {
      DeleteDepartment.choices.push(await rows[i].name);
   }
   
   menu(DeleteDepartment);
}

async function fAddEmployee_manager(rows) {
   AddEmployee[3].choices = ['NULL'];

   for (let i in rows) {
      AddEmployee[3].choices.push(await (rows[i].first_name + ' ' + rows[i].last_name));
   }
}

async function fAddEmployee_role(rows) {
   AddEmployee[2].choices = [''];

   for (let i in rows) {
      AddEmployee[2].choices.push(await rows[i].title);
   }
   if (AddEmployee[2].choices.length > 1) {
      AddEmployee[2].choices.shift();
   }
   clearCur();setCur();
   menu(AddEmployee);
}

async function fUpdateEmployeeRole_employee(rows) {
   UpdateEmployeeRole[0].choices = [];
   for (let i in rows) {
      UpdateEmployeeRole[0].choices.push(await (rows[i].first_name + " " + rows[i].last_name));
   }
}

async function fUpdateEmployeeRole_role(rows) {
   UpdateEmployeeRole[1].choices = [];
   for (let i in rows) {
      UpdateEmployeeRole[1].choices.push(await rows[i].title);
   }
   clearCur();setCur();
   // console.table(UpdateEmployeeRole);
   setTimeout(function() {
      menu(UpdateEmployeeRole);
   },200);
}

async function fUpdateEmployeeManager_employee(rows) {
   UpdateEmployeeManager[0].choices = [];
   for (let i in rows) {
      UpdateEmployeeManager[0].choices.push(await (rows[i].first_name + " " + rows[i].last_name));
   }
}

async function fUpdateEmployeeManager_manager(rows) {
   UpdateEmployeeManager[1].choices = [];
   for (let i in rows) {
      UpdateEmployeeManager[1].choices.push(await rows[i].first_name + " " + rows[i].last_name);
   }
   clearCur();setCur();
   setTimeout(function() {
      menu(UpdateEmployeeManager);
   }, 200);
}

/*
handle query result to callback function
*/
async function query(stmt, callback) {
   const con = await mysql.createConnection(db);
   await con.promise().query(stmt)
      .then( ([rows,fields]) => {
         callback(rows);
      })
      .catch(console.log)
      .then( () => con.end());
   return 1;
}
/*
handle multiple line of SQL Statment of transaction
*/
function execSQL(stmt) {
   let rows = stmt.split(`;`);
   const con = mysql.createConnection(db);
   con.promise().query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
   con.promise().beginTransaction();
   
   try {
      for(let i in rows) {
         con.promise().query(rows[i]);
      }
      con.promise().commit();
   } catch (err) {
      con.promise().rollback();
      console.log(err);
   }
   con.promise().end();
}

/*
Main Logic
*/
function menu(questions) {
   return inquirer.prompt(questions).then(async (answers) => {
      let sAction = answers.sAction;
      if (sAction == "View All Employees") {
         //query("select a.id, a.first_name, a.last_name, b.title, b.salary, concat(c.first_name,' ',c.last_name) as manager from employee a left join role b on a.role_id = b.id left join employee c on c.id = a.manager_id", fView);
         query("select a.id, a.first_name, a.last_name, b.title, c.name as department, b.salary, concat(d.first_name,' ',d.last_name) as manager from employee a left join role b on a.role_id = b.id left join department c on b.department_id = c.id left join employee d on d.id = a.manager_id", fView);
      } else if (sAction == "View Employees by Manager") {
         //sqlAction = sAction;
         vAction = sAction;
         query("select distinct first_name, last_name from employee where id in (select manager_id from employee where manager_id IS NOT NULL)", fViewEmployeesByManager);
      } else if (sAction == "View Employees by Department") {
         //sqlAction = sAction;
         vAction = sAction;
         query("select distinct name from department order by name", fViewEmployeesByDepartment);
      } else if (sAction == "Add Employee") {
         sqlAction = sAction;
         query("select * from employee", fAddEmployee_manager);
         query("select * from role", fAddEmployee_role);
      } else if (sAction == "Update Employee Role") {
         sqlAction = sAction;
         query("select * from employee", fUpdateEmployeeRole_employee);
         query("select * from role", fUpdateEmployeeRole_role);
      } else if (sAction == "Update Employee Manager") {
         sqlAction = sAction;
         query("select * from employee", fUpdateEmployeeManager_employee).then(() =>{
            query("select * from employee", fUpdateEmployeeManager_manager);
         });
      } else if (sAction == "Delete Employee") {
         sqlAction = sAction;
         query("select * from employee", fDeleteEmployee);
      } else if (sAction == "Delete Role") {
         sqlAction = sAction;
         query("select * from role", fDeleteRole);
      } else if (sAction == "Delete Department") {
         sqlAction = sAction;
         query("select * from department", fDeleteDepartment);
      } else if (sAction == "View All Roles") {
         query("select a.id, a. title, a.salary, b.name as department from role a left join department b on a.department_id = b.id", fView);
      } else if (sAction == "Add Role") {
         sqlAction = sAction;
         query("select * from department", fAddRole);
      } else if (sAction == "View All Departments") {
         query("select * from department", fView);
      } else if (sAction == "Add Department") {
         sqlAction = sAction;
         menu(AddDepartment);
      } else if (sAction == "Budget of Department") {
         let stmt = "select c.`name` as department, sum(b.salary) as total from employee a left join role b on a.role_id = b.id left join department c on b.department_id = c.id group by c.`name`";
         query(stmt, fView);
      } else if (sAction == "Quit") {
         return answers;
      } else if (vAction == "View Employees by Manager") {
         let stmt = `select a.first_name, a.last_name, b.title from (select * from employee a where manager_id = (select id from employee where concat(first_name, ' ',last_name) = '${answers.manager}')) a left join role b on a.role_id = b.id`;
         query(stmt, fView);
         vAction = "";
      } else if (vAction == "View Employees by Department") {
         let stmt = `select c.first_name, c.last_name, a.name from department a left join role b on a.id = b.department_id left join employee c on b.id = c.role_id where a.name = '${answers.name}'`;
         query(stmt, fView);
         vAction = "";
      } else {
         let outMessage = "";
         if (sqlAction == "Add Department") {
            let stmt = `insert into department(name) values ("${answers.department}")`;
            execSQL(stmt);
         } else if (sqlAction == "Add Role") {
            if (answers.department != '') {
               if (answers.salary.match(/^\d+$/i)) {
                  let stmt = `insert into role(title, salary, department_id) values ("${answers.title}",${answers.salary},(select id from department where name='${answers.department}'))`;
                  execSQL(stmt);
               } else {
                  outMessage = "Salary: invalid input, only accept number!";
               }
            } else {
               outMessage = "Department not found!";
            }

         } else if (sqlAction == "Add Employee") {
            if (answers.role != '') {
               let stmt = `select id into @manager_id from employee where concat(first_name, ' ',last_name) = '${answers.manager}';`;
               stmt += `insert into employee(first_name, last_name, role_id, manager_id) values ("${answers.first_name}","${answers.last_name}",(select id from role where title='${answers.role}'),@manager_id)`;
               execSQL(stmt);
            } else {
               outMessage = "Department not found!";
            }

         } else if (sqlAction == "Update Employee Role") {
            //let stmt = `update employee set role_id = (select id from role where title='${answers.role}'), manager_id = null where concat(first_name, ' ',last_name) = '${answers.employee}'`;
            let stmt = `update employee set role_id = (select id from role where title='${answers.role}') where concat(first_name, ' ',last_name) = '${answers.employee}'`;
            execSQL(stmt);
         } else if (sqlAction == "Update Employee Manager") {
            let stmt = `select id into @employee_id from employee where concat(first_name, ' ',last_name) = '${answers.employee}';`;
            stmt += `select id into @manager_id from employee where concat(first_name, ' ',last_name) = '${answers.manager}';`;
            stmt += `update employee set manager_id = @manager_id where id = @employee_id`;

            execSQL(stmt);
         } else if (sqlAction == "View Employees by Manager") {
            let stmt = `select a.first_name, a.last_name, b.title from (select * from employee a where manager_id = (select id from employee where concat(first_name, ' ',last_name) = '${answers.manager}')) a left join role b on a.role_id = b.id`;
            query(stmt, fExecView);
         } else if (sqlAction == "View Employees by Department") {
            let stmt = `select c.first_name, c.last_name, a.name from department a left join role b on a.id = b.department_id left join employee c on b.id = c.role_id where a.name = '${answers.name}'`;
            query(stmt, fExecView);
         } else if (sqlAction == "Delete Employee") {
            let stmt = `delete from employee where concat(first_name,' ',last_name) = '${answers.employee}'`;
            execSQL(stmt);
         } else if (sqlAction == "Delete Role") {
            let stmt = `update employee set role_id = NULL where role_id = (select id from role where title = '${answers.title}');`;
            stmt += `delete from role where title = '${answers.title}'`;
            execSQL(stmt);
         } else if (sqlAction == "Delete Department") {
            let stmt = `update role set department_id = NULL where department_id = (select id from department where name = '${answers.department}');`;
            stmt += `delete from department where name = '${answers.department}'`;
            execSQL(stmt);
         }
         sqlAction = "";
         clearCur();setCur();
         
         if (outMessage.length > 0) {
            console.log("\n" +outMessage + "\n");
         }
         return menu(menuList);
      }
   });
};

clearCur();setCur();
menu(menuList);
