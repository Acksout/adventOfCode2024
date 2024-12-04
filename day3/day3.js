const fs = require("fs");
const data = fs.readFileSync("day3data.txt", "utf8");
const reqRegex = /mul\(\d{1,9},\d{1,9}\)/g;

function findMuls() {
  const goodMuls = data.match(reqRegex) || [];
  console.log(goodMuls);
  return goodMuls;
}

function multiplyGoodMuls(goodMuls) {
  let total = 0;

  goodMuls.forEach((mul) => {
    const match = /mul\((\d+),(\d+)\)/.exec(mul);
    if (match) {
      const num1 = parseInt(match[1], 10);
      const num2 = parseInt(match[2], 10);
      const product = num1 * num2;
      total = total + product;
    }
  });

  console.log(total);
}

const goodMuls = findMuls();
multiplyGoodMuls(goodMuls);
