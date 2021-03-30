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
    
    num1 = ''; // you may not need these, trace code!
    num2 = '';
   
}

function updateDisplay(value){
    if(value.length > 8) {
        return;
    }
    // changeClearBtn();    
    resultCont.textContent = "";
    resultCont.textContent += value;
}

function getOperation(ev) {
    if(ev.target.dataset.value === "=") {
        getResult(num1,num2,mathOperation);
        num1 = "";
        num2 = "";
    }
    if(ev.target.dataset.value === "+" && mathOperation) {
        getResult(num1,num2,mathOperation);
        result = add(num1,num2);
        displayResult(result);
        num1 = "";
        num2 = "";
    }
    if(ev.target.dataset.value === "-" && mathOperation) {
        getResult(num1,num2,mathOperation);
        result = substract(num1,num2);
        displayResult(result);
        num1 = "";
        num2 = "";
    }

    if(ev.target.dataset.value === "*" && mathOperation) {
        getResult(num1,num2,mathOperation);
        if(num2 === "") num2 = 1;
        result = multiply(num1,num2);
        displayResult(result);
        num1 = "";
        num2 = "";
    }

    if(ev.target.dataset.value === "/" && mathOperation) {
        getResult(num1,num2,mathOperation);
        if(num2 === "") num2 = 1;
        result = divide(num1,num2);
        displayResult(result);
        num1 = "";
        num2 = "";
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
        displayResult(result); // is this neccessary?
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
        console.log(result)
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
        console.log(result,num2)
        return Number(result) + Number(num2);
    } else {
        return Number(num1) + Number(num2);
    }
}

function divide(num1,num2) {
    if(result) {
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

// function changeClearBtn() {  
//     if(num1.length > 0 && !mathOperation && !num2) {
//         toggleClearBtn.allClear = false;
//         toggleClearBtn.clear = true;
//         clearAllBtn.style.display = "none";
//         clearBtn.style.display = "block";
//         console.log("hello");
//     }
//     if(num1 && mathOperation && !num2) {
//         toggleClearBtn.allClear = true;
//         toggleClearBtn.clear = false;
//         clearAllBtn.style.display = "block";
//         clearBtn.style.display = "none";
//         console.log("hi")
//     } 
// }

// function changeClear() {
//     if(window.getComputedStyle(clearAllBtn,null).display === 'block') {
//         clearAllBtn.style.display = "none";
//         clearBtn.style.display = "block";
//     } else {
//         clearAllBtn.style.display = "block";
//         clearBtn.style.display = "none"; 
//     } 
// }
    


function clear() {
    if(num1 && !mathOperation && !num2) {
        num1 = "";
        resultCont.textContent = "0";
        // changeClear();
    }
    if(num1 && mathOperation && !num2) {
        mathOperation = "";
        // changeClear();
    }
    if(num1 && mathOperation && num2) {
        num2 = "";
        resultCont.textContent = "0";
        // changeClear();
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