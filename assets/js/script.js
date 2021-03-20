const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  special: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
}
document.querySelector('#generate').onclick = generatePassword;

function generatePassword() {
  const length = promptLength(8, 128);
  const validCharacters = confirmValidCharacters();
  let password = '';
  for (let i = 0; i < length; i++) {
    password += validCharacters[randomIntInRange(0, validCharacters.length)];
  }
  alert(password);
}

function promptLength(min, max) {
  let length = prompt('Enter length');
  while (length < min || length > max || isNaN(length)) {
    length = prompt(`Length must be a number between ${min} and ${max}`);
  }
  return length;
}

function confirmValidCharacters() {
  let validCharacters = '';
  while(!validCharacters) {
    for (const key in characters) {
      if (confirm(`Include ${key} characters?`)) validCharacters += characters[key];
    }
    if (!validCharacters) alert('At least one character type must be selected');
  }
  return validCharacters;
}

function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}