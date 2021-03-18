const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numericCharacters = '0123456789';
const specialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
class PasswordOptions {
  constructor() {
    this.criteria = {
      specifyLength: false,
      specifyCharacterTypes: false
    }
    this.length = randomIntInRange(8, 129);
    this.characterTypes = lowerCaseLetters + upperCaseLetters + numericCharacters + specialCharacters;
  }
}
const passwordTextarea = document.querySelector('#password');
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', prompts);


function prompts() {
  const passwordOptions = new PasswordOptions;
  passwordOptions.criteria.specifyLength = confirm('Specify length?');
  passwordOptions.criteria.specifyCharacterTypes = confirm('Specify character types?');
  if (passwordOptions.criteria.specifyLength) {
    let length = prompt('Enter a password length');
    while (isNaN(length) || length < 8 || length > 128) {
      length = prompt('Invalid input. Must be a number between 8 and 128');
    }
    passwordOptions.length = length;
  }
  if (passwordOptions.criteria.specifyCharacterTypes) {
    passwordOptions.characterTypes = '';
    while(!passwordOptions.characterTypes) {
      if(confirm('Include lowercase letters?')) {
        passwordOptions.characterTypes += lowerCaseLetters;
      }
      if(confirm('Include uppercase letters?')) {
        passwordOptions.characterTypes += upperCaseLetters;
      }
      if(confirm('Include numeric characters?')) {
        passwordOptions.characterTypes += numericCharacters;
      }
      if(confirm('Include special characters?')) {
        passwordOptions.characterTypes += specialCharacters;
      }
      if(!passwordOptions.characterTypes) {
        alert('At least one character type must be selected');
      }
    }
  }
  writePassword(passwordOptions);
}


function writePassword(passwordOptions) {
  const password = generatePassword(passwordOptions);
  passwordTextarea.value = password;
}


function generatePassword(passwordOptions) {
  let password = '';
  for (let i = 0; i < passwordOptions.length; i++) {
    password += passwordOptions.characterTypes[randomIntInRange(0, passwordOptions.characterTypes.length)];
  }
  return password;
}

/**
 * Returns a random integer between the `min`(inclusive) and `max`(exclusive).
 */
function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}