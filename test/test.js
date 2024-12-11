const { PyRange } = require("range-pie");

const range = new PyRange(-10, 1, 2);
console.log(range);
range.forEach((i) => console.log(i));

const range2 = new PyRange(10, 1, -100);
console.log(range2);
range2.forEach((i) => console.log(i));
