const Employee = require('./employee');

class Manager extends Employee {
   constructor(id, name, email, officeNumber) {
      super(id, name, email);
      this.id = id;
      this.name = name;
      this.officeNumeber = officeNumber;

      this.info = "Office number";
      this.infoDetail = this.officeNumeber;
   }

   getOfficeNumeber() {
      return this.officeNumeber;
   }

   getRole() {
      return 'Manager';
   }
}

module.exports = Manager;