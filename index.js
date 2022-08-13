const displayArea = document.querySelector('#displayArea');
let firstOperand = '';
let secondOperand = '';
let currentOperation = '';
let result;
const operations = ['+', '-', '*', '/'];

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => (b === 0 ? 'Infinity' : a / b);

const operate = (a, b, operator) => {
    let result = 0;
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            break;
    }
    return result;
}

const isNumber = (text) => text >= 0 && text <= 9 ? true : false;
const isOperation = (text) => operations.includes(text) ? true : false;
const deleteLast = () => displayArea.textContent = displayArea.textContent.toString().slice(0, -1);
const clear = () => {
    updateDisplay('0')
    firstOperand = '';
    secondOperand = '';
    currentOperation = '';
}
const addNumber = (number) => {
    if (displayArea.textContent.startsWith('0') && !displayArea.textContent.includes('.')) {
        updateDisplay(number);
    } else {
        let display = displayArea.textContent + number;
        updateDisplay(display);
    }
}

const addDecimalPoint = () => {
    let display = displayArea.textContent;
    if (firstOperand === '') {
        if (displayArea.textContent.includes('.'))
            return;
        display += '.';
    } else {
        let secondOperand = displayArea.textContent.slice(firstOperand.length + 1);
        if (secondOperand.includes('.'))
            return;
        display += '.';
    }
    updateDisplay(display);
}

const addOperation = (text) => {
    let display = displayArea.textContent;
    if (display.includes('=')) {
        display = result;
        currentOperation = text;
        display += ` ${text}`;
        updateDisplay(display);
    } else {
        if (!operations.includes(display.charAt(display.length - 1))) {
            if (display.includes('+') || display.includes('-') || display.includes('/') || display.includes('*')) {
                let operands = display.split(currentOperation);
                secondOperand = operands[1];
            }
        }

        if (isAllInfoFound())
            evaluate();
        else {
            firstOperand = displayArea.textContent;
            currentOperation = text;
            let operation = display.charAt(display.length - 1);
            if (operations.includes(operation)) {
                if (operation !== text) {
                    display = display.slice(0, -1);
                    display += ` ${text}`;
                }
            } else {
                display += ` ${text}`;
            }
            updateDisplay(display);
        }
    }
}

function btnAction(e) {
    let text = e.target.textContent;
    let display = displayArea.textContent;
    if (display.length >= 17) {
        display += '\n';
        updateDisplay(display);
    }
    let number = isNumber(text);
    let operation = isOperation(text);
    if (number) {
        addNumber(text);
    } else if (text === '.') {
        addDecimalPoint();
    } else if (text === '=') {
        if (display.includes('='))
            return;
        evaluate();
    } else if (operation) {
        addOperation(text);
    } else if (text === 'Clear') {
        clear();
    } else if (text === 'Delete') {
        deleteLast();
    }
}
const btns = document.querySelectorAll('.btn');
btns.forEach(btn => btn.addEventListener('click', btnAction));

function updateDisplay(text) {
    displayArea.textContent = text;
}

const isAllInfoFound = () => {
    let isFound = true;
    if (firstOperand === '' || firstOperand === undefined || firstOperand === ' ')
        isFound = false;
    else if (secondOperand === '' || secondOperand === undefined || secondOperand === ' ')
        isFound = false;
    else if (currentOperation === '' || currentOperation === undefined)
        isFound = false;
    return isFound;
}

const evaluate = () => {
    let operands = displayArea.textContent.split(currentOperation);
    firstOperand = operands[0];
    secondOperand = operands[1];
    if (isAllInfoFound()) {
        firstOperand = (firstOperand === '.') ? '0.0' : firstOperand;
        secondOperand = (secondOperand === '.') ? '0.0' : secondOperand;
        result = operate(Number(firstOperand), Number(secondOperand), currentOperation);
        if (result === 'Infinity') {
            alert("Error can't divide by zero");
            updateDisplay('0');
            return;
        }
        result = Math.round(result * 1000) / 1000;
        let display = `${firstOperand} ${currentOperation} ${secondOperand} = ${result}`;
        updateDisplay(display);
    }
}

window.addEventListener('keydown', handleKeyborad);

function handleKeyborad(e) {
    console.log(e.key);
    if (e.key >= 0 && e.key <= 9)
        addNumber(e.key);
    if (e.key === '.')
        addDecimalPoint();
    if (e.key === '=' || e.key === 'Enter') {
        if (displayArea.textContent.includes('='))
            return;
        evaluate();
    }
    if (e.key === 'Backspace')
        deleteLast();
    if (e.key === 'Escape')
        clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        addOperation(e.key);
}
