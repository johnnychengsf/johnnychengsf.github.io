const Manager = require('../lib/manager');

describe('manager', () => {
   describe('Initialization', () => {
      it("should create an object with a 'manager' property set to number, text, email and officeNumber when called with the 'new' keyword", () => {
         const testManager = new Manager(2, "peter", "peter@zmail.com", 999);

         expect(typeof testManager.getId()).toBe("number");
         expect(testManager.getId() > 0).toBe(true);

         expect(typeof testManager.getName()).toBe("string");
         expect(testManager.getName().length > 0).toBe(true);

         expect(testManager.getEmail()).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
         expect(testManager.getEmail().length > 0).toBe(true);

         expect(typeof testManager.officeNumeber).toBe("number");

         expect(testManager.getRole()).toBe("Manager");
      });
   });
});
