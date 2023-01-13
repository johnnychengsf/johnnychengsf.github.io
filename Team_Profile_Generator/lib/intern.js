const Employee = require('./employee');

class Intern extends Employee {
   constructor(id, name, email, school) {
      super(id, name, email);
      this.id = id;
      this.name = name;
      this.school = school;

      this.info = "School";
      this.infoDetail = this.school;
   }
   getSchool() {
      return this.school;
   }

   getRole() {
      return 'Intern';
   }
}

module.exports = Intern;