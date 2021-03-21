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
  const text = document.querySelector('#text');
  text.textContent = '';
  let count = 0;
  const intervalID = setInterval(() => {
    text.textContent += validCharacters[randomIntInRange(0, validCharacters.length)];
    count++;
    if (count >= length) clearInterval(intervalID);
  }, 30);
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