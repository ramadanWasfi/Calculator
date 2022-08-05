
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => (b === 0? 'Infinity': a / b); 

console.log(add(5,6))
console.log(subtract(5,6))
console.log(multiply(5,6))
console.log(divide(12,0))