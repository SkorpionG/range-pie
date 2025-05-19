import { PyRange } from "range-pie";

const range = new PyRange(1, 6);
const squares = range.filter((x: number) => x % 2 === 0).map((x: number) => x * x);
console.log(squares); // [4, 16]
