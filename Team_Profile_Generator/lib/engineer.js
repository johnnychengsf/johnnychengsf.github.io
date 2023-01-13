const Employee = require('./employee');

class Engineer extends Employee {
   constructor(id, name, email, github) {
      super(id, name, email);
      this.id = id;
      this.name = name;
      this.github = github;

      this.info = "GitHub";
      this.infoDetail = `<a href='https://github.com/${this.github}'>${this.github}</a>`;
   }

   getGithub() {
      return this.github;
   }

   getRole() {
      return 'Engineer';
   }
}

module.exports = Engineer;