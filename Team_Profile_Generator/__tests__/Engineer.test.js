const Engineer = require('../lib/engineer');

describe('engineer', () => {
   describe('Initialization', () => {
      it("should create an object with a 'engineer' property set to number, text, email and github when called with the 'new' keyword", () => {
         const testEngineer = new Engineer(3, "paul", "paul@zmail.com", "paulgithub");

         expect(typeof testEngineer.getId()).toBe("number");
         expect(testEngineer.getId() > 0).toBe(true);

         expect(typeof testEngineer.getName()).toBe("string");
         expect(testEngineer.getName().length > 0).toBe(true);

         expect(testEngineer.getEmail()).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
         expect(testEngineer.getEmail().length > 0).toBe(true);

         expect(typeof testEngineer.getGithub()).toBe("string");
         expect(testEngineer.getGithub().length > 0).toBe(true);

         expect(testEngineer.getRole()).toBe("Engineer");
      });
   });
});
