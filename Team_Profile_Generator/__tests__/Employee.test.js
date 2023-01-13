const Employee = require('../lib/employee');

describe('Employee', () => {
   describe('Initialization', () => {
      it("should create an object with a 'employee' property set to number, text and email when called with the 'new' keyword", () => {
         const testEmployee = new Employee(1, "smith", "smith@zmail.com");

         expect(testEmployee.getId()).toBe(1);
         expect(testEmployee.getName()).toBe("smith");
         expect(testEmployee.getEmail()).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
         expect(testEmployee.getRole()).toBe("Employee");
      });
   });
});
