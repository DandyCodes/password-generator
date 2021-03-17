// Assignment Code
const passwordTextArea = document.querySelector('#password');
const generateButton = document.querySelector('#generate');
const main = document.querySelector('main');
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numericCharacters = '0123456789';
const specialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
let passwordOptions = {
  criteria: [],
  length: randomIntInRange(8, 128),
  characterTypes: lowerCaseLetters + upperCaseLetters + numericCharacters + specialCharacters
}


const promptDiv = main.appendChild(document.createElement('div'));
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
  const password = generatePassword();
  passwordTextArea.value = password;
}


function promptCriteria() {
  cleanUpPrompt();
  readyCancel();

  const criteriaDiv = promptDiv.appendChild(document.createElement('div'));
  criteriaDiv.appendChild(document.createElement('h3')).textContent = 'Select Criteria';
  criteriaDiv.setAttribute('id', 'criteria');
  const criteriaContent = criteriaDiv.appendChild(document.createElement('div'));
  const lengthCheck = criteriaContent.appendChild(document.createElement('input'));
  lengthCheck.type = 'checkbox';
  criteriaContent.appendChild(document.createElement('label')).textContent = 'Length';
  criteriaContent.appendChild(document.createElement('br'));
  const characterCheck = criteriaContent.appendChild(document.createElement('input'));
  characterCheck.type = 'checkbox';
  criteriaContent.appendChild(document.createElement('label')).textContent = 'Character Type';
  criteriaContent.appendChild(document.createElement('br'));
  const okButton  = criteriaDiv.appendChild(document.createElement('button'));
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

  const lengthDiv = promptDiv.appendChild(document.createElement('div'));
  lengthDiv.appendChild(document.createElement('h3')).textContent = 'Specify Length';
  lengthDiv.setAttribute('id', 'length');
  const lengthContent = lengthDiv.appendChild(document.createElement('div'));
  lengthContent.appendChild(document.createElement('label')).textContent = '(8 - 128 characters)';
  lengthContent.appendChild(document.createElement('br'));
  const lengthInput = lengthContent.appendChild(document.createElement('input'));
  const okButton  = lengthDiv.appendChild(document.createElement('button'));
  okButton.addEventListener('click', ok);
  okButton.textContent = 'Ok';
  const errorMessage = lengthDiv.appendChild(document.createElement('p'));

  function ok() {
    const input = lengthInput.value;
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

  const charDiv = promptDiv.appendChild(document.createElement('div'));
  charDiv.appendChild(document.createElement('h3')).textContent = 'Select Character Types';
  charDiv.setAttribute('id', 'char');
  const charContent = charDiv.appendChild(document.createElement('div'));
  const lowerCheck = charContent.appendChild(document.createElement('input'));
  lowerCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Lowercase Letters';
  charContent.appendChild(document.createElement('br'));
  const upperCheck = charContent.appendChild(document.createElement('input'));
  upperCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Uppercase Letters';
  charContent.appendChild(document.createElement('br'));
  const numericCheck = charContent.appendChild(document.createElement('input'));
  numericCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Numeric Characters';
  charContent.appendChild(document.createElement('br'));
  const specialCheck = charContent.appendChild(document.createElement('input'));
  specialCheck.type = 'checkbox';
  charContent.appendChild(document.createElement('label')).textContent = 'Special Characters';
  charContent.appendChild(document.createElement('br'));
  const okButton  = criteriaDiv.appendChild(document.createElement('button'));
  okButton.addEventListener('click', ok);
  okButton.textContent = 'Ok';
  const errorMessage = lengthDiv.appendChild(document.createElement('p'));

  function ok() {
    if (!(lowerCheck.checked || upperCheck.checked || numericCheck.checked || specialCheck.checked)) {
      errorMessage.textContent = "You must select at least one character type";
    }
    else {
      writePassword();
    }
  }
}


function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}