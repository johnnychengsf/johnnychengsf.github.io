const fs = require("fs");

class Employee {

   constructor(id, name, email) {
      if (typeof id !== 'number') {
         id = parseInt(id);
      }
      this.id = id;
      this.name = name;
      this.email = email;

      this.info = "";
      this.infoDetail = "";
   }

   getId() {
      return this.id;
   }

   getName() {
      return this.name;
   }

   getEmail() {
      return this.email;
   }

   getRole() {
      return 'Employee';
   }

   getInfo() {
      return this.info;
   }

   getInfoDetail() {
      return this.infoDetail;
   }

   getHTML() {
      return eval("`" + fs.readFileSync('./src/card.html') + "`");
   }
}

module.exports = Employee;