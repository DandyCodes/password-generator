// Assignment Code
let passwordTextArea = document.querySelector('#password');
let generateButton = document.querySelector('#generate');
let main = document.querySelector('main');
let lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
let upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let numericCharacters = '0123456789';
let specialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
let passwordOptions = {
  criteria: [],
  length: randomIntInRange(8, 128),
  validCharacters: lowerCaseLetters + upperCaseLetters + numericCharacters + specialCharacters
}


let promptDiv = main.appendChild(document.createElement('div'));
promptDiv.setAttribute('id', 'prompt');
generateButton.addEventListener('click', promptCriteria);


function readyGenerate() {
  generateButton.removeEventListener('click', cancel);
  generateButton.addEventListener('click', promptCriteria);
  generateButton.textContent = "Generate Password";
}


function readyCancel() {
  generateButton.removeEventListener('click', promptCriteria);
  generateButton.addEventListener('click', cancel);
  generateButton.textContent = "Cancel";
}


function cancel() {
  cleanUpPrompt();
  readyGenerate();
}

function cleanUpPrompt() {
  Array.from(promptDiv.children).forEach(child => {
    child.remove();
  });
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  passwordTextArea.value = password;
}


function generatePassword() {
  let password = '';
  for (let i = 0; i < passwordOptions.length; i++) {
    password += passwordOptions.validCharacters[randomIntInRange(0, passwordOptions.validCharacters.length - 1)];
  }
  return password;
}


function promptCriteria() {
  cleanUpPrompt();
  readyCancel();

  let criteriaDiv = promptDiv.appendChild(document.createElement('div'));
  criteriaDiv.appendChild(document.createElement('h3')).textContent = 'Select Criteria';
  criteriaDiv.setAttribute('id', 'criteria');
  let criteriaContent = criteriaDiv.appendChild(document.createElement('div'));
  let lengthCheck = criteriaContent.appendChild(document.createElement('input'));
  lengthCheck.type = 'checkbox';
  criteriaContent.appendChild(document.createElement('label')).textContent = 'Length';
  criteriaContent.appendChild(document.createElement('br'));
  let characterCheck = criteriaContent.appendChild(document.createElement('input'));
  characterCheck.type = 'checkbox';
  criteriaContent.appendChild(document.createElement('label')).textContent = 'Character Type';
  criteriaContent.appendChild(document.createElement('br'));
  let okButton  = criteriaDiv.appendChild(document.createElement('button'));
  okButton.addEventListener('click', ok);
  okButton.textContent = 'Ok';

  function ok() {
    if (lengthCheck.checked) {
      passwordOptions.criteria.push('length');
    }
    if (characterCheck.checked) {
      passwordOptions.criteria.push('characterTypes')
    }
    if (passwordOptions.criteria.includes('length')) {
      promptLength();
    }
    else if (passwordOptions.criteria.includes('characterTypes')) {
      promptCharacterTypes();
    }
    else {
      writePassword();
    }
  }
}


function promptLength() {
  cleanUpPrompt();
  readyCancel();

  let lengthDiv = promptDiv.appendChild(document.createElement('div'));
  lengthDiv.appendChild(document.createElement('h3')).textContent = 'Specify Length';
  lengthDiv.setAttribute('id', 'length');
  let lengthContent = lengthDiv.appendChild(document.createElement('div'));
  lengthContent.appendChild(document.createElement('label')).textContent = '(8 - 128 characters)';
  lengthContent.appendChild(document.createElement('br'));
  let lengthInput = lengthContent.appendChild(document.createElement('input'));
  let okButton  = lengthDiv.appendChild(document.createElement('button'));
  okButton.addEventListener('click', ok);
  okButton.textContent = 'Ok';
  let errorMessage = lengthDiv.appendChild(document.createElement('p'));

  function ok() {
    let input = lengthInput.value;
    if(isNaN(input) || input < 8 || input > 128) {
      errorMessage.textContent = 'Invalid input. Must be a number between 8 and 128';
    }
    else {
      passwordOptions.length = input;
      if (passwordOptions.criteria.includes('characterTypes')) {
        promptCharacterTypes();
      }
      else {
        writePassword();
      }
    }
  }
}


function promptCharacterTypes() {
  cleanUpPrompt();
  readyCancel();

  let charDiv = promptDiv.appendChild(document.createElement('div'));
  charDiv.appendChild(document.createElement('h3')).textContent = 'Select Character Types';
  charDiv.setAttribute('id', 'char');
  let charContent = charDiv.appendChild(document.createElement('div'));
  let lowerCheck = charContent.appendChild(document.createElement('input'));
  lowerCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Lowercase Letters';
  charContent.appendChild(document.createElement('br'));
  let upperCheck = charContent.appendChild(document.createElement('input'));
  upperCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Uppercase Letters';
  charContent.appendChild(document.createElement('br'));
  let numericCheck = charContent.appendChild(document.createElement('input'));
  numericCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Numeric Characters';
  charContent.appendChild(document.createElement('br'));
  let specialCheck = charContent.appendChild(document.createElement('input'));
  specialCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Special Characters';
  charContent.appendChild(document.createElement('br'));
  let okButton  = criteriaDiv.appendChild(document.createElement('button'));
  okButton.addEventListener('click', ok);
  okButton.textContent = 'Ok';
  let errorMessage = lengthDiv.appendChild(document.createElement('p'));

  function ok() {
    if (!(lowerCheck.checked || upperCheck.checked || numericCheck.checked || specialCheck.checked)) {
      errorMessage.textContent = "You must select at least one character type";
    }
    else {
      passwordOptions.validCharacters = '';
      if(lowerCheck.checked) {
        passwordOptions.validCharacters += lowerCaseLetters;
      }
      if(upperCheck.checked) {
        passwordOptions.validCharacters += upperCaseLetters;
      }
      if(numericCheck.checked) {
        passwordOptions.validCharacters += numericCharacters;
      }
      if(specialCheck.checked) {
        passwordOptions.validCharacters += specialCharacters;
      }
      writePassword();
    }
  }
}


function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}