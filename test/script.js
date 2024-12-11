const PyRange = require("range-pie");

const range = new PyRange(1, 6);
const squares = range
    .filter(x => x % 2 === 0)
    .map(x => x * x);
console.log(squares); // [4, 16]