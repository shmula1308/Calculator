const appContainer = document.querySelector('.app-container');
const resultCont = document.querySelector('.result-container');
const clearAllBtn = document.querySelector('.all-clear');
const clearBtn = document.querySelector('.clear-btn');

let input = "";
let num1 = '';
let num2 = '';
let mathOperation = "";
let result = "";

appContainer.addEventListener('click', captureInput) 
clearBtn.addEventListener('click',clear);
clearAllBtn.addEventListener('click',clearAll);

function displayResult(result) {
    console.log(result.toString().length)
    if(result.toString().length > 8) {
        resultCont.textContent = "ERR";
        return;
    } 
    resultCont.textContent = result;
    mathOperation = "";
    num1 = '';
    num2 = '';
    input = "";
}

function updateDisplay(value) {
    if(resultCont.textContent === '0') {
        resultCont.textContent = "";
        resultCont.textContent += value;
    } else if(mathOperation && input.length === 1) {
        resultCont.textContent = "";
        resultCont.textContent += value;
    } else if(input.length > 8) {
        return;
    }
    else {
        resultCont.textContent += value;
    }
}


function captureInput(ev) {
    let value = ev.target.dataset.value;
    if(ev.target.matches('button')){
        if(value === '/' || value === '-' || value === '+' || value === '*' ) {
            if(num1) {
                input = "";
                mathOperation = value;
            } else if(num1 && mathOperation) {
                mathOperation = value;
                input = "";
            }
            else {
                num1 = input;
                input = "";
                mathOperation = value;
            }    
            
        } else if(value === "=" ) {
            num2 = input;
            input = "";
            getResult(num1,num2,mathOperation);

        } else if(value === "C" || value === "AC") {
            return;
        }
        else {
            changeClear();
            input+= value;
            updateDisplay(value);
        }
        return;
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
    return Number(num1) + Number(num2);
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



function changeClear() {
    clearAllBtn.style.display = "none";
    clearBtn.style.display = "block";
}
    


function clear() {
    if(mathOperation && input.length > 0) {
        input = "";
        resultCont.textContent = "0";
    } else if(mathOperation && input.length === 0) {
        mathOperation = "";
    } else if(result) {
        resultCont.textContent = "0";
        result = "";
        console.log(result,mathOperation,input,num1,num2)
    }
    else {
        resultCont.textContent = "0";
    }
    
}

function clearAll() {
    console.log();
}