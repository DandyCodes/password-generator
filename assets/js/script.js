document.querySelector('#generate').addEventListener('click', getCriteria);

function getCriteria() {
  const length = promptLength(8, 128);
  const validCharacterTypes = confirmValidCharacterTypes({
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numeric: '0123456789',
    special: ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  });
  generatePassword(length, validCharacterTypes);
}

function promptLength(min, max) {
  let length = prompt('Enter length');
  while (length < min || length > max || isNaN(length)) {
    length = prompt(`Length must be a number between ${min} and ${max}`);
  }
  return length;
}

function confirmValidCharacterTypes(characters) {
  const validCharacters = {};
  while(Object.keys(validCharacters).length == 0) {
    for (const key in characters) {
      if (confirm(`Include ${key} characters?`)) {
        validCharacters[key] = characters[key];
      }
    }
    if (Object.keys(validCharacters).length == 0) {
      alert('At least one character type must be selected');
    }
  }
  return validCharacters;
}

function generatePassword(length, validCharacterTypes) {
  let password = '';
  // ensure that at least one of each character type is included in the password
  for (const key in validCharacterTypes) {
    const randomIndex = randomRangeInt(0, validCharacterTypes[key].length);
    password += validCharacterTypes[key][randomIndex];
  }
  // combine valid character types into one large string to randomly fill the rest of the password
  let allValidCharacters = '';
  for (const key in validCharacterTypes) {
    allValidCharacters += validCharacterTypes[key];
  }
  // start index at the password's current length to continue building the password string
  for (let i = password.length; i < length; i++) {
    password += allValidCharacters[randomRangeInt(0, allValidCharacters.length)];
  }
  password = scrambleString(password);
  writePassword(password);
}

function writePassword(password) {
  const textarea = document.querySelector('#password');
  textarea.textContent = '';
  let count = 0;
  const intervalID = setInterval(() => {
    if (count == password.length) {
      clearInterval(intervalID);
      return;
    }
    textarea.textContent += password[count];
    count++;
  }, 30);
}

function randomRangeInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function scrambleString(inputString) {
  let characterArray = inputString.split('');
  characterArray.sort(function() {
    return 0.5 - Math.random();
  })
  return characterArray.join('');
}