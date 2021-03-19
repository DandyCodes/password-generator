document.querySelector('#generate').onclick = validateCriteria;

function validateCriteria() {
  const length = promptLength(8, 128);
  const allCharacters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numeric: '0123456789',
    special: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  }
  const validCharacters = confirmCharacters(allCharacters);
  document.querySelector('#password').value = generatePassword(length, validCharacters);
}

function promptLength(min, max) {
  let length = prompt('Enter a length');
  while (isNaN(length) || length < min || length > max) {
    length = prompt(`Length must be a number between ${min} and ${max}`);
  }
  return length;
}

function confirmCharacters(allCharacters) {
  let validCharacters = '';
  while(!validCharacters) {
    for (const key in allCharacters) {
      if (confirm(`Include ${key} characters?`)) validCharacters += allCharacters[key];
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