const appContainer = document.querySelector('.app-container');
const digitContainer = document.querySelector('.digit-btns-container');
const operationsContainer = document.querySelector('.arithmetic-btns-container');
const resultCont = document.querySelector('.result-container');
const clearAllBtn = document.querySelector('.all-clear');
const clearBtn = document.querySelector('.clear-btn');
let operationBtns = operationsContainer.querySelectorAll('button');


let num1 = '';
let num2 = '';
let mathOperation = "";
let result = "";

const toggleClearBtn = {
    allClear: true,
    clear: false
}


digitContainer.addEventListener('click',getOperands);
operationsContainer.addEventListener('click',getOperation);
clearBtn.addEventListener('click',clear);
clearAllBtn.addEventListener('click',clearAll);

function displayResult(result) {
    if(result === undefined) {
        return;
    }
    if(result.toString().length > 8) {
        resultCont.textContent = "ERR";
        return;
    } 
    
    resultCont.textContent = result;
   
    num1 = ''; 
    num2 = ''; 
}

function updateDisplay(value){
    if(value.length > 8) {
        return;
    }
    resultCont.textContent = "";
    resultCont.textContent += +value;
}

function getOperation(ev) {
    
    if(ev.target.dataset.value === "=") {
       getResult(num1,num2,mathOperation);
       mathOperation = "";
    }

    if(mathOperation) {
       getResult(num1,num2,mathOperation);
    }

    mathOperation = ev.target.dataset.value;
    
    operationBtns.forEach(btn => btn.classList.remove("btn-active"))

    if(ev.target.dataset.value != "=") {
        ev.target.classList.add('btn-active');
    }
    
    if(!num2) {
        return;
    }
    getResult(num1,num2,mathOperation);    
}



function getOperands(ev) {
    if(!mathOperation) {
        if(resultCont.textContent === "ERR") {
            return;
        }
        
        if(ev.target.dataset.value === '.' && num1[1] === '.' ) {
            return;
        }
        num1 += ev.target.dataset.value;
        updateDisplay(num1);
        if(num1.length === 1) {
            changeClearBtn(); 
        }
    } 
    if(mathOperation) {
        if(resultCont.textContent === "ERR") {
            return;
        }
        num2 += ev.target.dataset.value;
        updateDisplay(num2);
        if(!toggleClearBtn.clear) {
            changeClearBtn(); 
        }
    }     
}

 

function getResult(num1,num2,operation) {
    if(operation === '/') {
        result = divide(num1,num2);
        displayResult(result); 
    }
    if(operation === '*') {
        if(!num1 && !num2) {
            return;
        }
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
    if(result) {
        return Number(result) * Number(num2);
    } else {
        return Number(num1) * Number(num2);
    }
}

function add(num1,num2) {
    if(result) {
        return Number(result) + Number(num2);
    } else {
        return Number(num1) + Number(num2);
    }
}

function divide(num1,num2) {
    if(result) {
        if(num2 === "") num2 = 1;
        return limitFloatPoints(result,num2)
    } else {
        return limitFloatPoints(num1,num2)
    }
}

function limitFloatPoints(value1,value2) {
    let res = Number(value1) / Number(value2);
    if(Math.floor(res) === res) {
        return res;
    }
    if(!res) {
        return;
    } else {
        let numberOfDecimals = res.toString().split('.')[1].length;
        return numberOfDecimals  > 4 ? Number(res.toFixed(4)) : res; 
    }
     
}


function substract(num1,num2) {
    if(result) {
        return Number(result) - Number(num2);
    } else {
        return Number(num1) - Number(num2);
    }
}

function percentage(num1,num2) {
    let decNum = num1 / 100;
    return decNum * num2;
}

function changeClearBtn() {  
    if(toggleClearBtn.allClear === true) {
        toggleClearBtn.allClear = false;
        toggleClearBtn.clear = true;
        clearAllBtn.style.display = "none";
        clearBtn.style.display = "block";
    } else {
        toggleClearBtn.allClear = true;
        toggleClearBtn.clear = false;
        clearAllBtn.style.display = "block";
        clearBtn.style.display = "none";
    }
}


    


function clear() {
    if(num1 && !mathOperation && !num2) {
        num1 = "";
        resultCont.textContent = "0";
        changeClearBtn();
    }
    if(num1 && mathOperation && !num2) {
        mathOperation = "";
        operationBtns.forEach(btn => btn.classList.remove("btn-active"))
        changeClearBtn();
    }
    if(num1 && mathOperation && num2) {
        num2 = "";
        resultCont.textContent = "0";
        changeClearBtn();
    }
    if(!num1 && mathOperation && !num2 && result) {
        mathOperation = "";
        operationBtns.forEach(btn => btn.classList.remove("btn-active"))
        resultCont.textContent = "0";
        changeClearBtn();
    }
    
}
/**
 * @param {number} num2 Learn jsDoc
 */

function clearAll() {
    num1 = "";
    num2 = "";
    mathOperation = "";
    result = "";
    resultCont.textContent = "0";
    operationBtns.forEach(btn => btn.classList.remove("btn-active"))
}

