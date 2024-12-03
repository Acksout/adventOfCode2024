/*
The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:

The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three.
In the example above, the reports can be found safe or unsafe by checking those rules:

7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
So, in this example, 2 reports are safe.

Analyze the unusual data from the engineers. How many reports are safe?

in short: Should increase/decrease by 1-3 max
*/

const fs = require("fs");
const data = fs.readFileSync("day2data.txt", "utf8");
const nestedArray = data
  .trim()
  .split("\n")
  .map((line) => line.split(" ").map(Number));
// console.log(nestedArray);

let safeArr = [];

function compareNum(nestedArray) {
  for (let i = 0; i < nestedArray.length; i++) {
    let currArr = nestedArray[i];
    let isSafe = true;
    const isIncreasing = currArr[1] > currArr[0];
    const isDecreasing = currArr[1] < currArr[0];

    for (let j = 0; j < currArr.length - 1; j++) {
      let currNum = currArr[j];
      let nextNum = currArr[j + 1];
      const diff = nextNum - currNum;
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        isSafe = false;
        break;
      }

      if (isIncreasing && nextNum <= currNum) {
        isSafe = false;
        break;
      }
      if (isDecreasing && nextNum >= currNum) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) {
      safeArr.push(currArr);
    }
  }

  console.log(safeArr.length);
}
compareNum(nestedArray);
