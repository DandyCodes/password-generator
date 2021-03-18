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
const generateButton = document.querySelector('button');
generateButton.onclick = generateClicked;


function generateClicked() {
  const passwordOptions = new PasswordOptions;
  passwordOptions.criteria = confirmCriteria();
  if (passwordOptions.criteria.specifyLength) {
    passwordOptions.length = promptLength();
  }
  if (passwordOptions.criteria.specifyCharacterTypes) {
    passwordOptions.characterTypes = confirmCharacterTypes();
  }
  passwordTextarea.value = generatePassword(passwordOptions);
}

function confirmCriteria() {
  const criteria = {
    specifyLength: false,
    specifyCharacterTypes: false
  }
  criteria.specifyLength = confirm('Specify length?');
  criteria.specifyCharacterTypes = confirm('Specify character types?');
  return criteria;
}

function promptLength() {
  let length = prompt('Enter a password length');
  while (isNaN(length) || length < 8 || length > 128) {
    length = prompt('Invalid input. Must be a number between 8 and 128');
  }
  return length;
}

function confirmCharacterTypes() {
  let characterTypes = '';
  while(!characterTypes) {
    if(confirm('Include lowercase letters?')) {
      characterTypes += lowerCaseLetters;
    }
    if(confirm('Include uppercase letters?')) {
      characterTypes += upperCaseLetters;
    }
    if(confirm('Include numeric characters?')) {
      characterTypes += numericCharacters;
    }
    if(confirm('Include special characters?')) {
      characterTypes += specialCharacters;
    }
    if(!characterTypes) {
      alert('At least one character type must be selected');
    }
  }
  return characterTypes;
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