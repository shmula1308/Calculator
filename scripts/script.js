const appContainer = document.querySelector('.app-container');
const resultCont = document.querySelector('.result-container');

let input = "";
let num1 = '';
let num2 = '';
let mathOperation = "";
let result = "";
appContainer.addEventListener('click', captureInput) 


function displayResult(result) {
    resultCont.textContent = result;
}

function captureInput(ev) {
    let value = ev.target.dataset.value;
    if(ev.target.matches('button')){
        if(value === '/' || value === '-' || value === '+' || value === '*' ) {
            num1 = input;
            input = "";
            mathOperation = value;
            
        } else if(value === "=" 
        ) {
            num2 = input;
            input = "";
            console.log('num1',num1)
            console.log('num2',num2)
            console.log('mathOp',mathOperation);
            getResult(num1,num2,mathOperation);

        } else {
            input+= value;
        }
    }
}

function getResult(num1,num2,operation) {
    if(operation === '/') {
        result = divide(num1,num2);
        displayResult(result);
    }
    if(operation === '*') {
        result = multiply(num1,num2)
        displayResult(result);
    }
    if(operation === '-') {
        result = substract(num1,num2)
        displayResult(result);
    }
    if(operation === '+') {
        result = add(num1,num2);
        displayResult(result);
    }
    if(operation === '%') {
        result = percentage(num1,num2)
        displayResult(result);
    }   
}


function multiply(num1,num2) {
    return num1 * num2;
}

function add(num1,num2) {
    return +num1 + (+num2);
}

function divide(num1,num2) {
    return num1 / num2;
}

function substract(num1,num2) {
    return num1 - num2;
}

function percentage(num1,num2) {
    let decNum = num1 / 100;
    return decNum * num2;
}


