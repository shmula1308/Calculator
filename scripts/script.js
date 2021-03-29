const appContainer = document.querySelector('.app-container');
const digitContainer = document.querySelector('.digit-btns-container');
const operationsContainer = document.querySelector('.arithmetic-btns-container');
const resultCont = document.querySelector('.result-container');
const clearAllBtn = document.querySelector('.all-clear');
const clearBtn = document.querySelector('.clear-btn');

let input = "";
let num1 = '';
let num2 = '';
let mathOperation = "";
let result = "";


digitContainer.addEventListener('click',getOperands);
operationsContainer.addEventListener('click',getOperation);
clearBtn.addEventListener('click',clear);
clearAllBtn.addEventListener('click',clearAll);

function displayResult(result) {
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

function updateDisplay(value){
    if(value.length > 8) {
        return;
    }
    if(value.length === 1 && !num2 && !mathOperation) {
        changeClear();
    }
    // if(value.length === 1 && num1 && mathOperation) {
    //     changeClear();
    // }
   
    resultCont.textContent = "";
    resultCont.textContent += value;
}

function getOperation(ev) {
    if(ev.target.dataset.value === "=") {
        getResult(num1,num2,mathOperation)
    }
    mathOperation = ev.target.dataset.value;
}

function getOperands(ev) {
    if(!mathOperation) {
        num1 += ev.target.dataset.value;
        updateDisplay(num1);
    } 
    if(mathOperation) {
        num2 += ev.target.dataset.value;
        updateDisplay(num2);
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
    if(window.getComputedStyle(clearAllBtn,null).display === 'block') {
        clearAllBtn.style.display = "none";
        clearBtn.style.display = "block";
    } else {
        clearAllBtn.style.display = "block";
        clearBtn.style.display = "none"; 
    } 
}
    


function clear() {
    if(num1 && !mathOperation && !num2) {
        num1 = "";
        resultCont.textContent = "0";
        changeClear();
    }
    if(num1 && mathOperation && !num2) {
        mathOperation = "";
        changeClear();
    }
    if(num1 && mathOperation && num2) {
        num2 = "";
        resultCont.textContent = "0";
        changeClear();
    }
    // if(num1 && mathOperation && num2 && result) {
    //     console.log('hello')
    //     resultCont.textContent = "0";
    //     changeClear();
    // }
}

function clearAll() {
    console.log();
}