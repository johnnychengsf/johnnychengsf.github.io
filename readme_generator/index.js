const inquirer = require('inquirer');

const { writeFile } = require('fs').promises;
const fs = require('fs');

const repo = fs.readFileSync('repo.txt', {encoding:'utf8', flag:'r'});
//const aLicense = fs.readFileSync("license.txt",{encoding:'utf8', flag:'r'}).split(/\r?\n/);
const aLicense = fs.readdirSync("license");

// WHEN I am prompted for information about my application repository 
console.log("repository: " + repo);

const promptUser = () => {
  return inquirer.prompt([
    {
      // WHEN I enter my project title
      name: 'sTitle',
      type: 'input',
      default: 'None',
      message: 'Title of the README?',
    },
    {
      name: 'sDescription',
      type: 'input',
      default: 'None',
      message: 'Description?',
    },
    {
      name: 'sInstallation',
      type: 'input',
      default: 'None',
      message: 'Installation?',
    },
    {
      name: 'sUsage',
      type: 'input',
      default: 'None',
      message: 'Usage?',
    },
    {
      name: 'sLicense',
      type: 'list',
      message: 'license type?',
      choices: aLicense,
      default: 'The Unlicense',
    },
    {
      name: 'sContributing',
      type: 'list',
      message: 'Contributor Covenant v2.1?',
      default: 'Yes',
      choices: ['Yes','No']
    },
    {
      name: 'sTests',
      type: 'input',
      message: 'Tests:',
    },
    {
      name: 'sGithubUsername',
      type: 'input',
      default: 'None',
      message: 'Github Username?',
    },
    {
      name: 'sEmail',
      type: 'input',
      default: 'None',
      message: 'Email?',
    }
  ]);
};
const genReadme = (data) => {
  let sLicenseInfo = "";
  let sBadgeURL = "";
  let sContributing = "None";

  if (fs.existsSync('./license/' + data.sLicense)) {
    sLicenseInfo = fs.readFileSync('./license/' + data.sLicense);
  }
  if (fs.existsSync('./badges/' + data.sLicense)) {
    sBadgeURL = fs.readFileSync('./badges/' + data.sLicense);
  }
  if (data.sContributing == 'Yes') {
    sContributing = '[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)';
  }

  return eval("`" + fs.readFileSync('./readme.temp', {encoding:'utf8', flag:'r'}) + "`");  
}

const init = () => {
   promptUser()
      .then((data) => {
        if (fs.existsSync("./out/README.md")) {
          console.log("file exists!");
          const bakFile = './out/README.md.' + Date.now().toString();
          fs.renameSync('./out/README.md', bakFile);
          console.log("Backup README.md to " + bakFile);
        }

        writeFile('./out/README.md', genReadme(data));
      })
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
 };

init();
