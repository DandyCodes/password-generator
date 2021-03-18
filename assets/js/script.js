class PasswordOptions {
  constructor() {
    this.length = randomIntInRange(8, 129);
    this.validCharacters = lowerCaseLetters + upperCaseLetters + numericCharacters + specialCharacters;
  }
}
let passwordOptions = new PasswordOptions;
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numericCharacters = '0123456789';
const specialCharacters = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const promptDiv = createPromptDiv();
const passwordTextarea = setUpPasswordTextarea();
const generateButton = setUpGenerateButton();
readyGenerate();


function createPromptDiv() {
  const promptDiv = document.querySelector('main').appendChild(document.createElement('div'));
  promptDiv.setAttribute('id', 'prompt');
  return promptDiv;
}


function setUpPasswordTextarea() {
  const passwordTextarea = document.querySelector('#password');
  passwordTextarea.value = '';
  return passwordTextarea;
}


function setUpGenerateButton() {
  const generateButton = document.querySelector('#generate');
  generateButton.addEventListener('click', promptCriteria);
  return generateButton;
}


function readyGenerate() {
  passwordOptions = new PasswordOptions;
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


function clearPassword() {
  passwordTextarea.value = '';
}

function writePassword() {
  cleanUpPrompt();

  const password = generatePassword();
  passwordTextarea.value = password;
  readyGenerate();
}


function generatePassword() {
  let password = '';
  for (let i = 0; i < passwordOptions.length; i++) {
    password += passwordOptions.validCharacters[randomIntInRange(0, passwordOptions.validCharacters.length)];
  }
  return password;
}


function promptCriteria() {
  clearPassword();
  readyCancel();
  cleanUpPrompt();

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
      passwordOptions.length = false;;
    }
    if (characterCheck.checked) {
      passwordOptions.validCharacters = false;
    }
    if (!passwordOptions.length) {
      promptLength();
    }
    else if (!passwordOptions.validCharacters) {
      promptCharacterTypes();
    }
    else {
      writePassword();
    }
  }
}


function promptLength() {
  cleanUpPrompt();

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
      if (!passwordOptions.validCharacters) {
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

  const characterDiv = promptDiv.appendChild(document.createElement('div'));
  characterDiv.appendChild(document.createElement('h3')).textContent = 'Select Character Types';
  characterDiv.setAttribute('id', 'character-types');
  const characterContent = characterDiv.appendChild(document.createElement('div'));
  const lowerCheck = characterContent.appendChild(document.createElement('input'));
  lowerCheck.type = 'checkbox';
  characterContent.appendChild(document.createElement('label')).textContent = 'Lowercase Letters';
  characterContent.appendChild(document.createElement('br'));
  const upperCheck = characterContent.appendChild(document.createElement('input'));
  upperCheck.type = 'checkbox';
  characterContent.appendChild(document.createElement('label')).textContent = 'Uppercase Letters';
  characterContent.appendChild(document.createElement('br'));
  const numericCheck = characterContent.appendChild(document.createElement('input'));
  numericCheck.type = 'checkbox';
  characterContent.appendChild(document.createElement('label')).textContent = 'Numeric Characters';
  characterContent.appendChild(document.createElement('br'));
  const specialCheck = characterContent.appendChild(document.createElement('input'));
  specialCheck.type = 'checkbox';
  characterContent.appendChild(document.createElement('label')).textContent = 'Special Characters';
  characterContent.appendChild(document.createElement('br'));
  const okButton  = characterDiv.appendChild(document.createElement('button'));
  okButton.addEventListener('click', ok);
  okButton.textContent = 'Ok';
  const errorMessage = characterDiv.appendChild(document.createElement('p'));

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

/**
 * Returns a random integer between the `min`(inclusive) and the `max`(exclusive).
 */
function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}