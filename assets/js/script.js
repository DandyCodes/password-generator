const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeric: '0123456789',
  special: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
}
document.querySelector('#generate').onclick = generatePassword;

function generatePassword() {
  const length = getLength();
  const validCharacters = getValidCharacters();
  let password = '';
  for (let i = 0; i < length; i++) {
    password += validCharacters[randomIntInRange(0, validCharacters.length)];
  }
  alert(password);
}

function getLength() {
  let length = prompt('Enter length');
  while (length < 8 || length > 128 || isNaN(length)) {
    length = prompt('Length must be a number between 8 and 128');
  }
  return length;
}

function getValidCharacters() {
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