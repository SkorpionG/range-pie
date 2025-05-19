import { PyRange } from "range-pie";

const range = new PyRange(-10, 1, 2);
console.log(range);
range.forEach((i: number) => console.log(i));

const range2 = new PyRange(10, 1, -100);
console.log(range2);
range2.forEach((i: number) => console.log(i));
