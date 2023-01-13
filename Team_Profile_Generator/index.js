const fs = require("fs");
const inquirer = require('inquirer');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const pathDist = "dist";

const sRow = "<div class='row'>${sCol}</div><!-- end row -->";

if (!fs.existsSync(pathDist)) {
   fs.mkdirSync(pathDist);
}

let employees = [];

const managerQuestions = [
   {
      name: 'sName',
      type: 'input',
      message: 'What is the team manager\'s name?'
   },{
      name: 'sID',
      type: 'input',
      message: 'What is the team manager\'s id?'
   },{
      name: 'sEmail',
      type: 'input',
      message: 'What is the team manager\'s email?'
   },{
      name: 'sOfficeNumber',
      type: 'input',
      message: 'What is the team manager\'s office number?'
   }
];
const engineerQuestions = [
   {
      name: 'sName',
      type: 'input',
      message: 'What is your engineer\'s name?'
   },{
      name: 'sID',
      type: 'input',
      message: 'What is your engineer\'s id?'
   },{
      name: 'sEmail',
      type: 'input',
      message: 'What is your engineer\'s email?'
   },{
      name: 'sGitHubUsername',
      type: 'input',
      message: 'What is your engineer\'s GitHub username?'
   }
];
const internQuestions = [
   {
      name: 'sName',
      type: 'input',
      message: 'What is the intern\'s name?'
   },{
      name: 'sID',
      type: 'input',
      message: 'What is your intern\'s id?'
   },{
      name: 'sEmail',
      type: 'input',
      message: 'What is your intern\'s email?'
   },{
      name: 'sSchool',
      type: 'input',
      message: 'What is your intern\'s school name?'
   }
];

const sAction = 
    {
      name: 'sAction',
      type: 'list',
      message: 'Which type of team member would you like to add?',
      default: 'Quit',
      choices: ['Quit','Manager','Engineer','Intern']
    };

function setRole(answers) {
   if (answers.hasOwnProperty('sOfficeNumber')) {
      return new Manager(parseInt(answers.sID), answers.sName, answers.sEmail, answers.sOfficeNumber);
   } else if (answers.hasOwnProperty('sGitHubUsername')) {
      return new Engineer(parseInt(answers.sID), answers.sName, answers.sEmail, answers.sGitHubUsername);
   } else if (answers.hasOwnProperty('sSchool')) {
      return new Intern(parseInt(answers.sID), answers.sName, answers.sEmail, answers.sSchool);
   }
   return null;
}

function getAnswers(questions) {
   return inquirer.prompt(questions).then((answers) => {
      if (answers.sAction == "Quit") {
         employees.push(setRole(answers));
         return answers;
      } else if (answers.sAction == "Manager") {
         employees.push(setRole(answers));
         return getAnswers([...managerQuestions, sAction]);
      } else if (answers.sAction == "Engineer") {
         employees.push(setRole(answers));
         return getAnswers([...engineerQuestions, sAction]);
      } else if (answers.sAction == "Intern") {
         employees.push(setRole(answers));
        return getAnswers([...internQuestions, sAction]);
      }
    });
 };

// first time must showing Manager
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
getAnswers([...managerQuestions, sAction])
 .then(() => {
   /* create ./dist/index.html */
   let sCol = "";
   let sCard = "";
   for(let i = 0;i < employees.length;i++) {
      sCol += employees[i].getHTML();
      if (i % 3 == 2) {
         //sCard += `<div class="row">${sCol}</div><!-- end row -->`;
         sCard += eval("`" + sRow + "`");
         sCol = "";
      }
   }
   if (sCol.length > 0) {
      //sCard += `<div class="row">${sCol}</div><!-- end row -->`;
      sCard += eval("`" + sRow + "`");
   }
   
// write to ./dist/index.html
   if (fs.existsSync("./dist/index.html")) {
      console.log("file exists!");
      const bakFile = './dist/index.html.' + Date.now().toString();
      fs.renameSync('./dist/index.html', bakFile);
      console.log("Backup index.html to " + bakFile);
    }
   fs.writeFileSync('./dist/index.html', eval("`" + fs.readFileSync('./src/template.html') + "`"));
   console.log("done");
 })
 .catch((error) => {
   console.log(error);
 });