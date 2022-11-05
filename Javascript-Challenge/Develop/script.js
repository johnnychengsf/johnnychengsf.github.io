window.addEventListener('DOMContentLoaded', (event) => {

  let selectPasswordLength = document.getElementById('int-Password-Length');
  // Assignment Code
  var generateBtn = document.querySelector("#generate");
  var resetBtn = document.querySelector("#reset");

  // Add event listener to generate button
  generateBtn.addEventListener("click", writePassword);
  resetBtn.addEventListener("click", function() {
    var passwordText = document.querySelector("#password");
    passwordText.value = "";
    document.querySelector("#password-criteria").innerHTML = "";
  });

  for (var i = 8; i<=128; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    selectPasswordLength.appendChild(opt);
  }

});

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
 
  passwordText.value = password;
  
}
function generatePassword() {
  // define string of password criteria
  let strNumeric = "0123456789";
  let strLowerCase = "abcdefghijklmnopqrstuvwxyz";
  let strUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let strSpecialCharacter = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  //let strSpecialCharacter = "`~!@#$%^&*()_+{}|[]\\;':\",./<>?";

  let strPasswordCriteria = "";
  document.querySelector("#password-criteria").innerHTML = "";
  // confim criteria
  if (confirm("Numeric?")) {
    strPasswordCriteria += strNumeric;
    document.querySelector("#password-criteria").innerHTML += " Numeric";
  }
  if (confirm("Lower Case?")) {
    strPasswordCriteria += strLowerCase;
    document.querySelector("#password-criteria").innerHTML += " LowerCase";
  }
  if (confirm("Upper Case?")) {
    strPasswordCriteria += strUpperCase;document.querySelector("#password-criteria").innerHTML += " UpperCase";
  }
  if (confirm("Special Character?")) {
    strPasswordCriteria += strSpecialCharacter;
    document.querySelector("#password-criteria").innerHTML += " SpecialCharacter";
  }
  
  let intPasswordLength = document.querySelector("#int-Password-Length option:checked").value;
  let strPasswordText = "";

  // generate passowrd
  for (var i = 0; i < intPasswordLength; i++ ) {
    strPasswordText += strPasswordCriteria.charAt(Math.floor(Math.random() * strPasswordCriteria.length));
  }
  
  return strPasswordText;
}

