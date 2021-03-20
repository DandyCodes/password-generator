document.querySelector('#generate').onclick = validateCriteria;

function validateCriteria() {
  const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numeric: '0123456789',
    special: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  }
  alert(generatePassword(getLength(8, 128), getCharacters(characters)));
}

function getLength(min, max) {
  let length = prompt('Enter a length');
  while (length < min || length > max || isNaN(length)) {
    length = prompt(`Length must be a number between ${min} and ${max}`);
  }
  return length;
}

function getCharacters(characters) {
  let validCharacters = '';
  while(!validCharacters) {
    for (const key in characters) {
      if (confirm(`Include ${key} characters?`)) validCharacters += characters[key];
    }
    if (!validCharacters) alert('At least one character type must be selected');
  }
  return validCharacters;
}

function generatePassword(length, validCharacters) {
  let password = '';
  for (let i = 0; i < length; i++) {
    password += validCharacters[randomIntInRange(0, validCharacters.length)];
  }
  return password;
}

function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}