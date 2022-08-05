
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => (b === 0? 'Infinity': a / b); 

console.log(add(5,6))
console.log(subtract(5,6))
console.log(multiply(5,6))
console.log(divide(12,0))

const operate = (a, b, operator) => {
    let result = 0;
    switch(operator) {
        case '+':
            result = add(a,b);
            break;
        case '-':
            result = subtract(a,b);
            break;
        case '*':
            result = multiply(a,b);
            break;
        case '/':
            result = divide(a,b);
            break;
        default:
            break;
    }
    return result;
}

console.log(operate(5,8,'+'))