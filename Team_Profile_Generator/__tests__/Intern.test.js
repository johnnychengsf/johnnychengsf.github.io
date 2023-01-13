const Intern = require('../lib/intern');

describe('intern', () => {
   describe('Initialization', () => {
      it("should create an object with a 'intern' property set to number, text, email and school when called with the 'new' keyword", () => {

         const testIntern = new Intern(4, "mary", "mary@zmail.com","st. mary college");

         expect(typeof testIntern.getId()).toBe("number");
         expect(testIntern.getId() > 0).toBe(true);

         expect(typeof testIntern.getName()).toBe("string");
         expect(testIntern.getName().length > 0).toBe(true);

         expect(testIntern.getEmail()).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
         expect(testIntern.getEmail().length > 0).toBe(true);

         expect(typeof testIntern.getSchool()).toBe("string");
         expect(testIntern.getSchool().length > 0).toBe(true);

         expect(testIntern.getRole()).toBe("Intern");
      });
   });
});
