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

let safeArr = [];
let unSafeArr = [];

function isSafe(arr) {
  const isIncreasing = arr[1] > arr[0];
  const isDecreasing = arr[1] < arr[0];

  for (let j = 0; j < arr.length - 1; j++) {
    const currNum = arr[j];
    const nextNum = arr[j + 1];
    const diff = nextNum - currNum;

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    if (isIncreasing && nextNum <= currNum) {
      return false;
    }
    if (isDecreasing && nextNum >= currNum) {
      return false;
    }
  }
  return true;
}

function compareNum(nestedArray) {
  for (let i = 0; i < nestedArray.length; i++) {
    let currArr = nestedArray[i];
    if (isSafe(currArr)) {
      safeArr.push(currArr);
    } else {
      unSafeArr.push(currArr);
    }
  }

  function skipOneBadLvl(unSafeArr) {
    for (let i = 0; i < unSafeArr.length; i++) {
      let arr = unSafeArr[i];
      for (let j = 0; j < arr.length; j++) {
        let modifiedArr = arr.slice(0, j).concat(arr.slice(j + 1));
        if (isSafe(modifiedArr)) {
          safeArr.push(arr);
          console.log(
            `Skipping level ${j + 1} in sequence ${i + 1} makes it safe.`
          );
          break;
        }
      }
    }
  }

  console.log(`Initial safe reports: ${safeArr.length}`);
  console.log(`Initial unsafe reports: ${unSafeArr.length}`);

  skipOneBadLvl(unSafeArr);

  console.log(`Final safe reports: ${safeArr.length}`);
  console.log(`Final unsafe reports: ${unSafeArr.length}`);
}

compareNum(nestedArray);
