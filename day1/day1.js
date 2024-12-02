const fs = require("fs");
const data = fs.readFileSync("day1data.txt", "utf8");
const lines = data.split("\n");

const column1 = [];
const column2 = [];

lines.forEach((line) => {
  const [col1, col2] = line.split("   ").map(Number);
  if (!isNaN(col1) && !isNaN(col2)) {
    column1.push(col1);
    column2.push(col2);
  }
});
// console.log(column1);
// console.log("TYPE OF:  ", typeof Array.from(column1));

// console.log(column2);

let diffResult = [];

function findDiff(column1, column2) {
  let sortedCol1 = Object.values(column1).sort((a, b) => a - b);
  let sortedCol2 = Object.values(column2).sort((a, b) => a - b);

  let difference;
  for (let i = 0; i < sortedCol1.length; i++) {
    difference = Math.abs(sortedCol1[i] - sortedCol2[i]);
    diffResult.push(difference);
  }
  console.log(diffResult);
}
findDiff(column1, column2);

function findTotal(diffResult) {
  let sumTotal = 0;
  for (let i = 0; i < diffResult.length; i++) {
    sumTotal += diffResult[i];
  }
  console.log("TOTAL: ", sumTotal);
}
findTotal(diffResult);
